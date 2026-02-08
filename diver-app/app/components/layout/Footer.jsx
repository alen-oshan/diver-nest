import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function DivingNestFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#205781] text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Diving Nest</h3>
            <p className="text-gray-300 text-sm">
              Your ultimate underwater adventure destination. Discover breathtaking diving experiences and luxury resort stays.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about-us" className="text-gray-300 hover:text-white transition-colors block">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors block">
                Contact
              </Link>
              <Link href="/enjoy" className="text-gray-300 hover:text-white transition-colors block">
                Diving Activities
              </Link>
              <Link href="/stay" className="text-gray-300 hover:text-white transition-colors block">
                Resort Stays
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <div className="space-y-2 text-sm">
              <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors block">
                Privacy Policy
              </Link>
              <Link href="/refund-policy" className="text-gray-300 hover:text-white transition-colors block">
                Refund Policy
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors block">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors block">
                Safety Guidelines
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>info@divingnest.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+1-800-DIVE-NEST</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-300">
                <MapPin size={16} className="mt-0.5" />
                <span>123 Ocean Drive<br />Miami, FL 33139</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300">
              © {currentYear} Diving Nest. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/sitemap.xml" className="text-gray-300 hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Customer Support
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}