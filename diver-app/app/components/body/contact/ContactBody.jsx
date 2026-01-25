'use client';

import React, { useState } from 'react'

const ContactBody = () => {
    const sendContactDetails = async () => {
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });
            
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    const [form, setForm] = useState({
        name: '',
        contact: '',
        message: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendContactDetails();
        setForm({
            name: '',
            contact: '',
            message: '',
        })
    };
  return (
    <div className="flex justify-center m-4 lg:mt-8">
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white border rounded-xl p-6 space-y-4 shadow-sm"
        >
            <h2 className="text-xl font-semibold text-gray-800">
            Get in Touch
            </h2>
            <p className="text-sm text-gray-500">
            Tell us a little about what you’re looking for.
            </p>

            <input
            name="name"
            value={form.name}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={handleChange}
            required
            />

            <input
            name="contact"
            value={form.contact}
            placeholder="Email or WhatsApp"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            onChange={handleChange}
            required
            />

            <textarea
            name="message"
            value={form.message}
            placeholder="Tell us what you're interested in"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows={4}
            onChange={handleChange}
            />

            <button
            type="submit"
            className="w-full bg-[#205781] text-white py-3 rounded-lg font-medium hover:opacity-80 transition"
            >
            Send Message
            </button>
        </form>
    </div>

  )
}

export default ContactBody