import Header from '@/app/components/layout/Header'
import ActivityBody from './ActivityBody';
import { findActivityByName } from '@/queries/activity'

export default async function ActivityDetail({params}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const activity = await findActivityByName(decodedSlug);
  console.log(activity);
  return (
    <>
      <Header />
      <ActivityBody activity={activity}/>
    </>
  );
}
