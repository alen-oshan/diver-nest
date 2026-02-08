import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import Providers from "./providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Diving Nest - Your Ultimate Underwater Adventure Destination",
    template: "%s - Diving Nest",
  },
  description: "Discover breathtaking diving experiences and luxury resort stays at Diving Nest. Book scuba diving tours, underwater activities, and oceanfront accommodations. Perfect for beginners and certified divers seeking unforgettable marine adventures.",
  keywords: "scuba diving, diving resort, underwater activities, diving tours, marine adventures, diving certification, oceanfront hotels, diving packages, snorkeling, dive trips",
  openGraph: {
    title: "Diving Nest - Your Ultimate Underwater Adventure Destination",
    description: "Book diving tours, activities, and luxury resort stays. Experience the underwater world with professional guides and top-tier equipment.",
    url: "https://divingnest.com",
    siteName: "Diving Nest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diving Nest - Your Ultimate Underwater Adventure Destination",
    description: "Book diving tours, activities, and luxury resort stays. Experience the underwater world with professional guides.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{ 
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
