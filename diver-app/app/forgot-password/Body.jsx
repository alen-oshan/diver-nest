"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleFormSubmit(event) {
        event.preventDefault();
        setError("");
        setMessage("");

        try {
            // Replace with your actual password reset action
            // const response = await sendPasswordResetEmail(email);
            
            // Mocking a successful response
            setMessage("A reset link has been sent to your email.");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    }

    return (
        <div className="flex justify-center mt-8">
            <form
                onSubmit={handleFormSubmit}
                className="w-full max-w-sm bg-white border rounded-lg p-6 shadow-sm space-y-4"
            >
                <h2 className="text-xl font-semibold text-center mb-2">
                    Reset Password
                </h2>

                <p className="text-sm text-center text-gray-600 px-2">
                    Enter the email associated with your account and we'll send you a link to reset your password.
                </p>

                {error && (
                    <p className="text-sm text-red-600 text-center border border-red-600 bg-red-50 p-3 rounded">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="text-sm text-green-600 text-center border border-green-600 bg-green-50 p-3 rounded">
                        {message}
                    </p>
                )}

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm mb-1 text-gray-700">
                        Email Address
                    </label>
                    <input
                        required
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#205781]/20 focus:border-[#205781]"
                        placeholder="your@email.com"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#205781] text-white py-2 rounded-md hover:opacity-80 transition font-medium"
                >
                    Send Reset Link
                </button>

                <div className="pt-2 text-center">
                    <Link href="/login" className="text-sm text-[#205781] hover:underline font-medium">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;