import React, { useState } from 'react'
import Image from "next/image";

const UserDetails = ({user, name, setName}) => {
  const handleSubmit = async(event) => {
    event.preventDefault();

    await fetch('/api/profile', {
      method:"PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: name}),
      credentials: "include",
    })

    setName(name);
  }

  return (
    
      <div className="bg-white border rounded-md p-4 row-span-2">
        <form onSubmit={handleSubmit}>
        <h2 className="text-lg mb-4">Profile</h2>

        <div className="flex items-center gap-4 mb-4">
          <Image
            src={user.image}
            alt={user.name}
            width={48}
            height={48} 
            className="w-20 h-20 rounded-full object-cover"
          />

          <div className="flex-1">
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <p className="text-md text-gray-600 mb-4">
          Email: {user.email}
        </p>

        <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
          Save Changes
        </button>
        </form>
      </div>
  )
}

export default UserDetails