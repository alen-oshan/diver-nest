import React from 'react'
import Link from 'next/link'
import SVG from '@/app/components/header/SVGComp'

const Navbar = () => {   
    const navbarList = ['Stay', 'Enjoy', 'Travel']       
    return (

      <div className="container mx-auto px-4 text-white">
        <nav className="flex items-center gap-8 py-4">
          {navbarList.map((nav, index) => (
            <Link
                key={index}
                href={`/${nav.toLowerCase()}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity text-lg"
            >
              <SVG src={`/${nav.toLowerCase()}.svg`} size={24} />
              {nav} 
            </Link>
          ))}
        </nav>
      </div>
    )
}

export default Navbar