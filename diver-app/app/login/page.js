import React from 'react'
import SocailLogin from '@/app/components/auth/SocailLogin'
import UserLogin from '@/app/components/auth/UserLogin'
import Header from '@/app/components/layout/Header'

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