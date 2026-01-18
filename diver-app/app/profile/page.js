import React from 'react'
import Header from '@/app/components/layout/Header'
import ProfileBody from './ProfileBody'
import {auth} from '@/app/auth'
import { redirect } from "next/navigation";

const page = async() => {
  const session = await auth();

  if (!session) redirect("/login");
  const {user} = session;

  return (
    <>
        <Header />
        <ProfileBody user={user}/>
    </>
  )
}

export default page