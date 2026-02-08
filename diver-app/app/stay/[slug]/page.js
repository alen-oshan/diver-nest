import Header from '@/app/components/layout/Header'
import ResortBody from '@/app/components/body/stay/resort/ResortBody';
import {findResortByName} from '@/queries/resort'

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

  return {
    title: `${resort.name} - Luxury Resort`,
    description: resort.description ? 
      `${resort.description.substring(0, 155)}...` : 
      `Stay at ${resort.name}, a luxury resort perfect for your diving vacation. Premium amenities, stunning ocean views, and world-class service.`,
    keywords: `${resort.name}, diving resort, luxury accommodation, oceanfront hotel, diving vacation, beach resort`,
    openGraph: {
      title: `${resort.name} - Diving Nest`,
      description: resort.description ? 
        `${resort.description.substring(0, 155)}...` : 
        `Stay at ${resort.name}, a luxury resort perfect for your diving vacation with premium amenities and stunning views.`,
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
      <ResortBody resort={resort}/>
    </>
  );
}
