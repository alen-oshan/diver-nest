import Header from '@/app/components/layout/Header';
import Body from '@/app/components/layout/LandingBody';
import Footer from '@/app/components/layout/Footer';

export const metadata = {
  title: "Diving Nest - Your Ultimate Underwater Adventure Destination",
  description: "Discover breathtaking diving experiences and luxury resort stays at Diving Nest. Book scuba diving tours, underwater activities, and oceanfront accommodations. Perfect for beginners and certified divers seeking unforgettable marine adventures.",
  keywords: "scuba diving, diving resort, underwater activities, diving tours, marine adventures, diving certification, oceanfront hotels, diving packages, snorkeling, dive trips",
  openGraph: {
    title: "Diving Nest - Your Ultimate Underwater Adventure Destination",
    description: "Book diving tours, activities, and luxury resort stays. Experience the underwater world with professional guides and top-tier equipment.",
    type: "website",
  },
};

export default async function LandingPage() {
  
  return (
    <div className='min-h-screen'>
      <Header />
      <Body />
      <Footer />      
    </div>
  );
}
