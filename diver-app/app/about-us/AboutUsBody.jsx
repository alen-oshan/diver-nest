import React from 'react'
import Image from 'next/image';
import { Linkedin, Instagram, MessageCircle } from 'lucide-react';

const AboutUsBody = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-6">
      <div className="lg:w-[70%] w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image and Social Section */}
          <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-gradient-to-br from-teal-50 to-cyan-50">
            <div className="w-64 h-64 rounded-md overflow-hidden shadow-xl mb-8">
              <Image
              width={1000}
              height={1000}
                src="https://images.unsplash.com/photo-1544551763-6e45ce662425?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzY3ViYSUyMGRpdmVyJTIwb2NlYW58ZW58MXx8fHwxNzY4NTAyNTUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Shehan Kirsten - Professional Diver"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-xl italic text-gray-900">
                You should experience the ocean, not just visit it.
              </p>
              
              <p>
                At Diving Nest, founded in 2026, I offer thoughtfully guided ocean 
                experiences shaped by my life in the water. 
              </p>

              <p>
                I'm Shehan Kirsten, a 
                20-year-old professional diver and PADI-certified Dive Master, driven 
                by a deep respect for the sea and the moments it creates.
              </p>

              <p>
                From dolphin and whale watching in the wild to personal diving and 
                snorkeling adventures, every experience is designed to help you truly 
                connect with the ocean. 
              </p>

              <p>
                To complete the journey, I've hand-picked 
                resorts that allow you to slow down, unwind, and carry the experience 
                with you long after you leave the water.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsBody