import Header from '@/app/components/layout/Header'

export const metadata = {
  title: "Privacy Policy",
  description: "Diving Nest's privacy policy explains how we collect, use, and protect your personal information when booking diving activities and resort accommodations.",
  keywords: "privacy policy, data protection, personal information, diving booking privacy",
  openGraph: {
    title: "Privacy Policy - Diving Nest",
    description: "Learn how we collect, use, and protect your personal information when using our diving and resort booking services.",
    type: "website",
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 lead mb-6">
                At Diving Nest, we are committed to protecting your privacy and personal information. This policy explains how we collect, use, and safeguard your data when you use our services.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">We collect information you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name, email address, and phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Emergency contact information</li>
                <li>Diving certification details and experience level</li>
                <li>Dietary restrictions and accessibility needs</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>IP address and device information</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referral sources and search terms</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Service Delivery</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Process and fulfill your bookings</li>
                <li>Communicate about your reservations</li>
                <li>Provide customer support</li>
                <li>Ensure safety requirements are met for diving activities</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Communication</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Send booking confirmations and updates</li>
                <li>Share important safety information</li>
                <li>Provide weather and activity updates</li>
                <li>Send promotional offers (with your consent)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Improvement and Analytics</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Analyze website usage and performance</li>
                <li>Improve our services and user experience</li>
                <li>Develop new features and offerings</li>
                <li>Conduct market research</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information Sharing</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">We may share your information with trusted third parties who help us operate our business:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Payment processors (for secure transaction handling)</li>
                <li>Diving operators and resort partners</li>
                <li>Email and communication service providers</li>
                <li>Website analytics services</li>
                <li>Customer support platforms</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">We may disclose your information when required by law or to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Comply with legal processes</li>
                <li>Protect our rights and property</li>
                <li>Ensure user safety</li>
                <li>Investigate fraud or security issues</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
              
              <p className="text-gray-700 mb-4">We implement industry-standard security measures to protect your information:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing partnerships</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal information</li>
                <li>Employee training on data protection</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Cookies and Tracking</h2>
              
              <p className="text-gray-700 mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Remember your preferences and login information</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Enable social media features</li>
                <li>Serve relevant advertisements</li>
              </ul>

              <p className="text-gray-700 mb-4">
                You can control cookie settings through your browser preferences, though this may affect website functionality.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights and Choices</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Access and Control</h3>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Access your personal information</li>
                <li>Update or correct your data</li>
                <li>Delete your account and associated data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Marketing Communications</h3>
              <p className="text-gray-700 mb-4">
                You can unsubscribe from promotional emails at any time by clicking the unsubscribe link or contacting us directly. Note that you will continue to receive transactional emails related to your bookings.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">International Data Transfers</h2>
              
              <p className="text-gray-700 mb-4">
                As a global diving service, we may transfer your information to countries outside your residence. We ensure appropriate safeguards are in place to protect your data during international transfers.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
              
              <p className="text-gray-700 mb-4">
                Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13. For minors participating in diving activities, parental consent and supervision are required.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
              
              <p className="text-gray-700 mb-4">
                We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes via email or website notice.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
              
              <p className="text-gray-700 mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <ul className="list-none space-y-1 text-gray-700">
                <li><strong>Email:</strong> privacy@divingnest.com</li>
                <li><strong>Phone:</strong> +1-800-DIVE-NEST</li>
                <li><strong>Address:</strong> Diving Nest Privacy Office, 123 Ocean Drive, Miami, FL 33139</li>
                <li><strong>Hours:</strong> Monday-Friday, 9AM-6PM EST</li>
              </ul>

              <p className="text-sm text-gray-600 mt-8 pt-4 border-t">
                This privacy policy was last updated on February 8, 2026. Effective date: February 8, 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}