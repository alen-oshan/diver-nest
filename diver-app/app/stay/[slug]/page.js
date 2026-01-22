import Header from '@/app/components/layout/Header'
import ResortBody from '@/app/components/body/stay/resort/ResortBody';
import {findResortByName} from '@/queries/resort'

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
