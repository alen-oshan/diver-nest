import Header from '@/app/components/layout/Header'
import ContactBody from '@/app/components/body/contact/ContactBody'

// Static generation for contact page
export const dynamic = 'force-static';

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Diving Nest for questions about diving tours, resort bookings, or travel planning. Our expert team is ready to help you plan the perfect underwater adventure.",
  keywords: "contact diving nest, diving tour inquiries, resort booking help, diving vacation planning, customer support",
  openGraph: {
    title: "Contact Us - Diving Nest",
    description: "Get in touch with our expert team for questions about diving tours, resort bookings, and travel planning.",
    type: "website",
  },
};

const page = () => {
  

  return (
    <>
      <Header />
      <ContactBody />
    </>
  );
};

export default page;
