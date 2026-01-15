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
        <div className="flex justify-center mt-8">
            <form
                onSubmit={handleFormSubmit}
                className="w-full max-w-sm bg-white border rounded-lg p-6 shadow-sm space-y-4"
            >
                <h2 className="text-xl font-semibold text-center mb-2">
                Welcome Back
                </h2>

                {error && (
                <p className="text-md text-red-600 text-center border-red-600 bg-red-200 p-4">
                    {error}
                </p>
                )}

                <div className="flex flex-col">
                <label htmlFor="email" className="text-sm mb-1 text-gray-700">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </div>

                <div className="flex flex-col">
                <label htmlFor="password" className="text-sm mb-1 text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </div>

                <button
                type="submit"
                className="w-full bg-[#205781] text-white py-2 rounded-md hover:opacity-80 transition font-medium"
                >
                Login
                </button>

                <p className="text-sm text-center text-gray-600">
                Don’t have an account?{" "}
                <Link href="/register" className="text-[#205781] hover:underline">
                    Register
                </Link>
                </p>
            </form>
        </div>


  )
}

export default UserLogin;