import React from "react";
import {
  ShieldCheck,
  Compass,
  Star,
  CalendarCheck,
  Leaf,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified & Safe Experiences",
    description:
      "Every dive, boat ride, and activity is verified and conducted by licensed operators who meet strict safety and certification standards.",
  },
  {
    icon: Compass,
    title: "All-in-One Booking Platform",
    description:
      "Book hotels, diving sessions, boat rides, and marine adventures in one place with transparent pricing and instant confirmation.",
  },
  {
    icon: Star,
    title: "Trusted Local Experts",
    description:
      "We partner with experienced local guides and certified instructors to deliver authentic, high-quality marine experiences.",
  },
  {
    icon: CalendarCheck,
    title: "Flexible & Hassle-Free Booking",
    description:
      "Easy rescheduling, clear cancellation policies, and real-time availability so you can plan your trip with confidence.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#98D2C0" }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl text-center mb-4"
          style={{ color: "#205781" }}
        >
          Why Choose Us
        </h2>
        <p
          className="text-center text-lg mb-12"
          style={{ color: "#205781" }}
        >
          Discover what makes Diving Nest the perfect choice for
          your underwater adventures
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: "#4F959D" }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3
                className="text-xl mb-3"
                style={{ color: "#205781" }}
              >
                {feature.title}
              </h3>
              <p className="text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}