import React from 'react'
import UserRegister from '@/app/components/auth/UserRegister'
import SocialLogin from '@/app/components/auth/SocailLogin'
import Header from '@/app/components/layout/Header'

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