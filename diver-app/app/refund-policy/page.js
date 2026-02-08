import Header from '@/app/components/layout/Header'

export const metadata = {
  title: "Refund Policy",
  description: "Learn about Diving Nest's refund and cancellation policies for diving activities and resort bookings. Understand your rights and our commitment to customer satisfaction.",
  keywords: "refund policy, cancellation policy, diving booking refund, resort booking cancellation",
  openGraph: {
    title: "Refund Policy - Diving Nest",
    description: "Understand our refund and cancellation policies for diving activities and resort bookings.",
    type: "website",
  },
};

export default function RefundPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 lead mb-6">
                At Diving Nest, we understand that travel plans can change. This policy outlines our refund and cancellation terms for diving activities and resort bookings.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Diving Activities Refund Policy</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Cancellation Timeline</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>More than 72 hours before activity:</strong> Full refund (100%)</li>
                <li><strong>48-72 hours before activity:</strong> 50% refund</li>
                <li><strong>24-48 hours before activity:</strong> 25% refund</li>
                <li><strong>Less than 24 hours:</strong> No refund</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Weather Cancellations</h3>
              <p className="text-gray-700 mb-4">
                If we cancel activities due to unsafe weather conditions, you will receive:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Full refund (100%) or</li>
                <li>Reschedule to another available date at no extra cost</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Resort Booking Refund Policy</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Standard Cancellation</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>More than 14 days before check-in:</strong> Full refund minus processing fee (5%)</li>
                <li><strong>7-14 days before check-in:</strong> 50% refund</li>
                <li><strong>3-7 days before check-in:</strong> 25% refund</li>
                <li><strong>Less than 3 days:</strong> No refund</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Peak Season Policy</h3>
              <p className="text-gray-700 mb-4">
                During peak diving seasons (December-April), stricter cancellation terms may apply:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>More than 30 days:</strong> Full refund minus 10% processing fee</li>
                <li><strong>15-30 days:</strong> 50% refund</li>
                <li><strong>Less than 15 days:</strong> No refund</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Special Circumstances</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Medical Emergencies</h3>
              <p className="text-gray-700 mb-4">
                We understand that medical emergencies can occur. With proper medical documentation, we may offer:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Full refund or credit for future bookings</li>
                <li>Case-by-case evaluation for compassionate refunds</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Travel Restrictions</h3>
              <p className="text-gray-700 mb-4">
                In case of government-imposed travel restrictions or border closures:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Full refund or reschedule with no penalties</li>
                <li>Credit valid for 2 years from original booking date</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How to Request a Refund</h2>
              
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>Contact our customer service team via email or phone</li>
                <li>Provide your booking confirmation number</li>
                <li>Specify the reason for cancellation</li>
                <li>Submit any required documentation (medical certificates, etc.)</li>
              </ol>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Processing Time</h2>
              <p className="text-gray-700 mb-4">
                Approved refunds will be processed within:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Credit Card:</strong> 5-10 business days</li>
                <li><strong>Bank Transfer:</strong> 3-7 business days</li>
                <li><strong>PayPal:</strong> 1-3 business days</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-2">
                For refund requests or questions about this policy:
              </p>
              <ul className="list-none space-y-1 text-gray-700">
                <li><strong>Email:</strong> refunds@divingnest.com</li>
                <li><strong>Phone:</strong> +1-800-DIVE-NEST</li>
                <li><strong>Hours:</strong> Monday-Friday, 9AM-6PM EST</li>
              </ul>

              <p className="text-sm text-gray-500 mt-8 pt-4 border-t">
                This refund policy was last updated on February 8, 2026. We reserve the right to modify these terms with reasonable notice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}