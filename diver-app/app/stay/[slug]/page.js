import Header from '@/app/components/layout/Header'
import ResortBody from '@/app/components/body/stay/resort/ResortBody';
import {findResortByName, findAllResorts} from '@/queries/resort'

// Use ISR with 60s revalidation — real-time availability is handled client-side via SSE
export const revalidate = 60;

// Generate static params for all resorts
export async function generateStaticParams() {
  try {
    const resorts = await findAllResorts();
    return resorts.map((resort) => ({
      slug: encodeURIComponent(resort.name),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({params}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const resort = await findResortByName(decodedSlug);
  
  if (!resort) {
    return {
      title: "Resort Not Found",
      description: "The requested resort could not be found."
    }
  }

  const desc = resort.description || '';

  return {
    title: `${resort.name} - Luxury Resort`,
    description: desc
      ? `${desc.substring(0, 155)}...`
      : `Stay at ${resort.name}, a luxury resort perfect for your diving vacation. Premium amenities, stunning ocean views, and world-class service.`,
    keywords: `${resort.name}, diving resort, luxury accommodation, oceanfront hotel, diving vacation, beach resort`,
    openGraph: {
      title: `${resort.name} - Diving Nest`,
      description: desc
        ? `${desc.substring(0, 155)}...`
        : `Stay at ${resort.name}, a luxury resort perfect for your diving vacation with premium amenities and stunning views.`,
      images: resort.images ? [{
        url: resort.images[0],
        width: 1200,
        height: 630,
        alt: resort.name,
      }] : [],
      type: "website",
    },
  };
}

export default async function ResortDetail({params}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const resort = await findResortByName(decodedSlug);
  return (
    <>
      <Header />
      <main>
        <ResortBody resort={resort}/>
      </main>
    </>
  );
}
