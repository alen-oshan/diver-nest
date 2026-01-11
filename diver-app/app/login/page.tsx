import React from 'react'
import SocailLogin from '@/app/components/auth/SocailLogin'
import UserLogin from '@/app/components/auth/UserLogin'

const LoginFrom = () => {
  return (
    <>
      <UserLogin />
      <SocailLogin />
    </>
  )
}

export default LoginFrom