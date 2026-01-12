import React from 'react'
import SlideShow from '@/app/components/body/landing/Slideshow'
import WhyChooseUs from '@/app/components/body/landing/WhyChooseUs'
import Reviews from '@/app/components/body/landing/Review'
import OneLine from '@/app/components/body/landing/OneLine'


const Body = () => {
  return (
    <>
      <SlideShow />
      <OneLine />
      <WhyChooseUs />
      <Reviews />
    </>
  )
}

export default Body