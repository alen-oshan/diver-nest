import React from 'react'
import { useState } from 'react';
import { compileFunction } from 'vm';

const ChangePassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handlePasswordChange = async(event) => {
        event.preventDefault();
        if (! (newPassword === confirmPassword)){
            alert("Passoword doesn't match")
            return;
        }
        await fetch('api/profile/change-password', {
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({confirmPassword}),
            method: "PUT",
            credentials: "include",
        })

    }
    return (
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 row-span-3">
            <form onSubmit={handlePasswordChange}>
            <h2 className="text-xl mb-1">Change Password</h2>
            <p className="text-sm text-gray-600 mb-6">
            Update your password to keep your account secure
            </p>

            <div className="space-y-4">
            
            <div>
                <label className="block text-sm mb-2">
                New Password
                </label>
                <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                    setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            <div>
                <label className="block text-sm mb-2">
                Confirm New Password
                </label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
            </div>
            </div>

            <button className="mt-6 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800" type='submit'>
                Update Password
            </button>
            </form>
        </div>
        
  )
}

export default ChangePassword