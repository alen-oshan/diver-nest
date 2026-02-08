import React from 'react'
import Header from '@/app/components/layout/Header'
import ProfileBody from './ProfileBody'
import { auth } from '@/app/auth'
import { redirect } from "next/navigation";
import { findUserByEmail } from '@/queries/user';

// Force dynamic for user-specific profile data
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "My Profile",
  description: "Manage your Diving Nest profile, view your booking history, update personal information, and track your diving adventures.",
  robots: "noindex, nofollow",
};

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