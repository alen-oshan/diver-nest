"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UserRegister = () => {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);
            const data = Object.fromEntries(formData);

            const response = await fetch('api/register', {
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(data),
            })
            console.log(response.status)
            response.status === 201 && router.push("/")
        } catch(e){
            console.log(e);
        }
    }
  return (
    <div className="flex justify-center mt-8">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm bg-white border rounded-lg p-6 shadow-sm space-y-4"
        >
            <h2 className="text-xl font-semibold text-center">
            Create Account
            </h2>

            <div className="flex flex-col">
            <label htmlFor="name" className="text-sm mb-1 text-gray-700">
                Name
            </label>
            <input
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            </div>

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
            Register
            </button>

            <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
                href="/login"
                className="text-[#205781] hover:underline"
            >
                Login
            </Link>
            </p>
        </form>
        </div>

  )
}

export default UserRegister;