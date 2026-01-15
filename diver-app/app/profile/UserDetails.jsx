import React, { useState } from 'react'

const mockProfile = {
  name: "Alen Perera",
  profilePic: "https://i.pravatar.cc/300?img=12",
  createdAt: "15 March 2024",
};

const UserDetails = () => {

  const [name, setName] = useState(mockProfile.name);

  return (
    <div className="bg-white border rounded-md p-4 row-span-2">
      <h2 className="text-lg mb-4">Profile</h2>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={mockProfile.profilePic}
          alt={mockProfile.name}
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

      <p className="text-sm text-gray-600 mb-4">
        Account created on {mockProfile.createdAt}
      </p>

      <button className="px-4 py-2 bg-black text-white rounded-md">
        Save Changes
      </button>
    </div>

  )
}

export default UserDetails