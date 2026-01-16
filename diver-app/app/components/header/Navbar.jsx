import React from 'react'
import Link from 'next/link'
import SVG from '@/app/components/header/SVGComp'
import {User, Mail} from 'lucide-react'

const Navbar = () => {   
    const navbarList = ['Stay', 'Enjoy']       
    return (
      <div className="container mx-auto  text-white">
        <nav className="flex items-center gap-5 lg:gap-8 py-4 lg:px-4 px-4">
          {navbarList.map((nav, index) => (
            <Link
                key={index}
                href={`/${nav.toLowerCase()}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-md"
            >
              <SVG src={`/${nav.toLowerCase()}.svg`} size={24} />
              {nav} 
            </Link>
          ))}
          <Link 
            href={"/about-us"}
            className='flex items-center gap-2 hover:opacity-80 transition-opacity text-md'
          > 
            <User />Story
          </Link>
          <Link 
            href={"/contact"}
            className='flex items-center gap-2 hover:opacity-80 transition-opacity text-md'
          > 
            <Mail />Contact
          </Link>
        </nav>
      </div>
    )
}

export default Navbar