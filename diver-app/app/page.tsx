import Header from '@/app/components/layout/Header';
import Body from '@/app/components/layout/Body';
import Footer from '@/app/components/layout/Footer';

export default async function LandingPage() {
  
  return (
    <div className='min-h-screen'>
      <Header />
      <Body />
      <Footer />      
    </div>
  );
}
