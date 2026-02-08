import React from 'react'
import Body from './Body'
import Header from '@/app/components/layout/Header'

export const metadata = {
  title: "Reset Your Password",
  description: "Forgot your password? Reset your Diving Nest account password to regain access to your bookings and diving experiences.",
  robots: "noindex, nofollow",
};

const page = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  )
}

export default page 