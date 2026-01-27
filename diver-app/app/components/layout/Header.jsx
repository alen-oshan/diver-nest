import React from 'react'
import Navbar from '@/app/components/header/Navbar'
import TopBar from '@/app/components/header/TopBar'

const Header = () => {
  
  return (
    <header className='bg-[#205781]'>
      <TopBar/>
      <Navbar/>
    </header> 
  )
}

export default Header