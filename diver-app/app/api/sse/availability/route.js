import { getReservesByName } from '@/queries/reserve';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const type = searchParams.get('type');

  if (!name || !type) {
    return new Response('Missing name or type parameter', { status: 400 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let lastData = null;

      const sendUpdate = async () => {
        try {
          const reservations = await getReservesByName(name);
          const dataString = JSON.stringify(reservations || []);
          
          // Only send if data changed
          if (dataString !== lastData) {
            lastData = dataString;
            controller.enqueue(encoder.encode(`data: ${dataString}\n\n`));
          }
        } catch (error) {
          console.error('SSE availability error:', error);
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
