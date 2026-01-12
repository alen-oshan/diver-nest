import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment: "Amazing experience! The instructors were professional and the dive sites were spectacular. Highly recommend Diving Nest!"
  },
  {
    name: "Michael Chen",
    rating: 5,
    date: "1 month ago",
    comment: "Best diving trip ever! Great equipment, knowledgeable guides, and stunning underwater views. Will definitely come back."
  },
  {
    name: "Emma Williams",
    rating: 5,
    date: "1 month ago",
    comment: "Perfect for beginners and experienced divers alike. The team made me feel safe and comfortable throughout the entire experience."
  },
  {
    name: "David Martinez",
    rating: 5,
    date: "2 months ago",
    comment: "Incredible coral reefs and marine life. The accommodation was top-notch too. Five stars all around!"
  }
];

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-[#205781] mb-4">
            What Our Guests Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400" size={24} />
              ))}
            </div>
            <span className="text-xl text-[#205781]">5.0</span>
          </div>
          <p className="text-gray-600">Based on Google Reviews</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-[#F6F8D5] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg text-[#205781]">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="fill-yellow-400 text-yellow-400" size={16} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
