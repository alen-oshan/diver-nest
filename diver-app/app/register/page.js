import React from 'react'
import UserRegister from '@/app/components/auth/UserRegister'
import SocialLogin from '@/app/components/auth/SocailLogin'
import Header from '@/app/components/layout/Header'

// Static generation for register page
export const dynamic = 'force-static';

export const metadata = {
  title: "Create Your Account",
  description: "Join Diving Nest community and create your account to book amazing diving experiences, luxury resort stays, and access exclusive member benefits.",
  robots: "noindex, nofollow",
};

const RegisterForm = () => {
  return (
    <>
      <Header />
      <UserRegister />
      <SocialLogin />
    </>
  )
}

export default RegisterForm;