import { findAllCartItemsByEmail } from '@/queries/cart';
import { auth } from '@/app/auth';

export async function GET(req) {
  const session = await auth();
  
  if (!session?.user?.email) {
    return new Response('Unauthorized', { status: 401 });
  }

  const email = session.user.email;
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let lastData = null;

      const sendUpdate = async () => {
        try {
          const items = await findAllCartItemsByEmail(email);
          const formattedData = items ? items.map((item) => ({
            ...item,
            id: item._id,
            name: item.activityName || item.resortName,
            price: Number(item.price),
            quantity: Number(item.quantity),
            checkIn: item.checkIn ? item.checkIn.split('T')[0] : null,
            checkOut: item.checkOut ? item.checkOut.split('T')[0] : null,
            activityDate: item.activityDate ? item.activityDate.split('T')[0] : null,
          })) : [];

          const dataString = JSON.stringify(formattedData);
          
          // Only send if data changed
          if (dataString !== lastData) {
            lastData = dataString;
            controller.enqueue(encoder.encode(`data: ${dataString}\n\n`));
          }
        } catch (error) {
          console.error('SSE cart error:', error);
        }
      };

      // Send initial data
      await sendUpdate();

      // Check for updates every 3 seconds
      const interval = setInterval(sendUpdate, 3000);

      req.signal.addEventListener('abort', () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
