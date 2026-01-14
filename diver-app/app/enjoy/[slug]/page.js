import Header from '@/app/components/layout/Header'
import ResortBody from '@/app/components/body/stay/resort/ResortBody';

const resort = {
    name: "Oceanview Paradise Resort & Spa",
    address: "123 Coastal Drive, Malibu, CA 90265, United States",
    coordinates: {
      lat: 34.0259,
      lng: -118.7798,
    },
    images: [
      "https://images.unsplash.com/photo-1729708475316-88ec2dc0083e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjgyNDIzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1629711129507-d09c820810b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBwb29sJTIwdHJvcGljYWx8ZW58MXx8fHwxNzY4MjQyMzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzY4MjA2NTQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1760888938853-f3f92bd210b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjByZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2ODI0MjM5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1761470575018-135c213340eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBzcGElMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjgyNDIzOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    amenities: [
      "Free WiFi",
      "Restaurant",
      "Breakfast",
      "Fitness Center",
      "Air Conditioning",
      "Free Parking",
    ],
    pricePerNight: 349,
    rating: 4.8,
    reviewCount: 342,
    locationMapUrl: "https://images.unsplash.com/photo-1760118382660-01c9d58c7b81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhdGlvbiUyMG1hcCUyMG1hcmtlcnxlbnwxfHx8fDE3NjgyNDIzOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  };

export default function ResortDetail() {
  return (
    <>
      <Header />
      <ResortBody resort={resort}/>
    </>
  );
}
