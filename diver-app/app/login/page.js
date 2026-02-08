import React from 'react'
import SocailLogin from '@/app/components/auth/SocailLogin'
import UserLogin from '@/app/components/auth/UserLogin'
import Header from '@/app/components/layout/Header'

export const metadata = {
  title: "Login to Your Account",
  description: "Sign in to your Diving Nest account to access your bookings, manage reservations, and unlock exclusive diving experiences and resort deals.",
  robots: "noindex, nofollow",
};

const LoginFrom = () => {
  return (
    <>
      <Header />
      <UserLogin />
      <SocailLogin />
    </>
  )
}

export default LoginFrom