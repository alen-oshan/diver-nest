"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Note: Client components cannot export static metadata.
// Metadata should be handled by the parent layout or moved to a server component.

const VerifyCode = () => {
    const router = useRouter();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Handle digit input
    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input automatically
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const code = otp.join("");
        
        if (code.length < 6) {
            setError("Please enter the full 6-digit code");
            return;
        }

        setIsLoading(true);
        try {
            // Replace with your actual verification logic
            // const response = await verifyOTPCode(code);
            console.log("Verifying code:", code);
            
            // Redirect to reset-password page on success
            router.push("/reset-password");
        } catch (err) {
            setError("Invalid code. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center mt-8 px-4">
            <form
                onSubmit={handleFormSubmit}
                className="w-full max-w-sm bg-white border rounded-lg p-6 shadow-sm space-y-6"
            >
                <div className="text-center space-y-2">
                    <h2 className="text-xl font-semibold">Verify Your Email</h2>
                    <p className="text-sm text-gray-600">
                        Enter the 6-digit code we sent to your inbox.
                    </p>
                </div>

                {error && (
                    <p className="text-sm text-red-600 text-center border border-red-600 bg-red-50 p-3 rounded">
                        {error}
                    </p>
                )}

                <div className="flex justify-between gap-2">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#205781]/20 focus:border-[#205781] transition-all"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#205781] text-white py-2.5 rounded-md hover:opacity-80 transition font-medium disabled:opacity-50"
                >
                    {isLoading ? "Verifying..." : "Verify Code"}
                </button>

                <div className="text-center space-y-3">
                    <p className="text-sm text-gray-600">
                        Didn't receive the code?{" "}
                        <button type="button" className="text-[#205781] font-medium hover:underline">
                            Resend
                        </button>
                    </p>
                    <Link href="/login" className="block text-sm text-gray-500 hover:text-[#205781]">
                        Back to Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default VerifyCode;