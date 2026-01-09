"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const UserRegister = () => {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const name = formData.get('name');
            const email = formData.get('email')
            const password = formData.get('password')

            const response = await fetch('api/register', {
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({
                    name, 
                    email,
                    password,
                })
            })
            console.log(response.status)
            response.status === 201 && router.push("/")
        } catch(e){
            console.log(e);
        }
    }
  return (
    <form onSubmit={handleSubmit}>          
            <div>
                <label htmlFor='name'>Name</label>
                <input className='border mx-2 border-gray-500 rounded' type='name' id='name' name='name'></input>
            </div>
            
            <div>
                <label htmlFor='email'>Email Address</label>
                <input className='border mx-2 border-gray-500 rounded' type='email' id='email' name='email'></input>
            </div>

            <div>
                <label htmlFor='password'>Password</label>
                <input className='border mx-2 border-gray-500 rounded' type='password' id='password' name='password'></input>
            </div>

            <button type='submit' className='bg-orange-300 rounded mt-4 flex justify-center w-36'> Register</button>
            <p>Don't have an account? <Link href="/">Login</Link></p>
        </form>
  )
}

export default UserRegister;