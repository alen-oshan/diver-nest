import React from 'react'
import Header from '@/app/components/layout/Header'
import ProfileBody from './ProfileBody'
import { auth } from '@/app/auth'
import { redirect } from "next/navigation";
import { findUserByEmail } from '@/queries/user';

const page = async() => {
  const session = await auth();

  if (!session) redirect("/login");
  const {user} = session;
  const userDetails = await findUserByEmail(user.email);

  return (
    <>
        <Header />
        <ProfileBody user={userDetails}/>
    </>
  )
}

export default page