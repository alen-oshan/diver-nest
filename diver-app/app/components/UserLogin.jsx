"use client";

import React, { use } from 'react'
import { doCredentialLogin } from '@/app/actions/index';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const UserLogin = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    async function handleFormSubmit(event){
        event.preventDefault();

        try{
            const formData = new FormData(event.target);
            const response = await doCredentialLogin(formData)
            
            if (!response.error){
                router.push("/home")
            } else {
                setError("Check your credentials");
            }
        }
        catch(error){
            console.log(error);
            setError("Check your credentials");
        }
    }
  return (
    <>
        <form onSubmit={handleFormSubmit}>
            <h1 className='text-xl text-red-600'>{error}</h1>
            <div>
                <label htmlFor='email'>Email Address</label>
                <input className='border mx-2 border-gray-500 rounded' type='email' id='email' name='email'></input>
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input className='border mx-2 border-gray-500 rounded' type='password' id='password' name='password'></input>
            </div>

            <button type='submit' className='bg-orange-300 rounded mt-4 flex justify-center w-36'> Login</button>
            <p>Don't have an account? <Link href="register">Register</Link></p>
        </form>
    </>
  )
}

export default UserLogin;