import Header from '@/app/components/layout/Header'
import AboutUsBody from './AboutUsBody';


export const metadata = {
  title: "About Us",
  description: "Learn about Diving Nest's mission to provide exceptional underwater adventures and luxury resort experiences. Discover our commitment to marine conservation and customer satisfaction.",
  keywords: "about diving nest, diving company, underwater adventures, marine conservation, diving expertise",
  openGraph: {
    title: "About Us - Diving Nest", 
    description: "Learn about our mission to provide exceptional underwater adventures and luxury resort experiences.",
    type: "website",
  },
}

export default function App() {
  return (
    <>
        <Header />
        <AboutUsBody />
    </>
  );
}
