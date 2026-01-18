import React, { useState } from 'react'

const UserDetails = ({user}) => {

  const [name, setName] = useState(user.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({name});
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white border rounded-md p-4 row-span-2">
        <h2 className="text-lg mb-4">Profile</h2>

        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.image}
            alt={user.name}
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
      </div>
    </form>

  )
}

export default UserDetails