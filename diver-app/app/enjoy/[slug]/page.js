import Header from '@/app/components/layout/Header'
import ActivityBody from './ActivityBody';
import { findActivityByName } from '@/queries/activity'

export async function generateMetadata({params}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const activity = await findActivityByName(decodedSlug);
  
  if (!activity) {
    return {
      title: "Activity Not Found",
      description: "The requested diving activity could not be found."
    }
  }

  return {
    title: `${activity.name} - Diving Activity`,
    description: activity.description ? 
      `${activity.description.substring(0, 155)}...` : 
      `Experience ${activity.name} with Diving Nest. Professional guides, top-quality equipment, and unforgettable underwater adventures await.`,
    keywords: `${activity.name}, diving activity, underwater adventure, scuba diving, marine experience, diving tour`,
    openGraph: {
      title: `${activity.name} - Diving Nest`,
      description: activity.description ? 
        `${activity.description.substring(0, 155)}...` : 
        `Experience ${activity.name} with professional guides and top-quality equipment.`,
      images: activity.images ? [{
        url: activity.images[0],
        width: 1200,
        height: 630,
        alt: activity.name,
      }] : [],
      type: "website",
    },
  };
}

export default async function ActivityDetail({params}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const activity = await findActivityByName(decodedSlug);
  return (
    <>
      <Header />
      <ActivityBody activity={activity}/>
    </>
  );
}
