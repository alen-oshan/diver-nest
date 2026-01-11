import React from 'react'
import UserRegister from '@/app/components/auth/UserRegister'
import SocialLogin from '@/app/components/auth/SocailLogin'

const RegisterForm = () => {
  return (
    <>
        <UserRegister />
        <SocialLogin />
    </>
  )
}

export default RegisterForm;