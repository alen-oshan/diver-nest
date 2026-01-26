'use client';

import React, { useState } from 'react'
import { Edit2 } from 'lucide-react';

const UserBody = (props) => {

    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: ""
    });
    const [users, setUsers] = useState(props.users)

    const handleEdit = (user, index) => {
    setEditRowIndex(index);
    setEditForm({
        name: user.name,
        email: user.email,
        role: user.role
    });
    };

    const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSave = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index] = { ...updatedUsers[index], ...editForm };
    setUsers(updatedUsers); // assuming users is state
    setEditRowIndex(null);
    };

    const handleCancel = () => {
    setEditRowIndex(null);
    };

    return (
        <>
            <header className="mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold">User Management</h2>
                <button className="bg-[#205781] text-white px-6 py-2 rounded shadow-sm hover:opacity-90">
                    Add New User
                </button>
            </header>

            <div className="bg-white border border-[#205781]/20 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-[#205781] text-white">
                        <th className="p-4 font-semibold">User Name</th>
                        <th className="p-4 font-semibold">Email</th>
                        <th className="p-4 font-semibold">Role</th>
                        <th className="p-4 font-semibold text-center">Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {users.map((user, index) => (
                        <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                        {/* Name */}
                        <td className="p-4">
                            {editRowIndex === index ? (
                            <input
                                name="name"
                                value={editForm.name}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            ) : (
                            user.name
                            )}
                        </td>

                        {/* Email */}
                        <td className="p-4">
                            {editRowIndex === index ? (
                            <input
                                name="email"
                                value={editForm.email}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            ) : (
                            user.email
                            )}
                        </td>

                        {/* Role */}
                        <td className="p-4">
                            {editRowIndex === index ? (
                            <select
                                name="role"
                                value={editForm.role}
                                onChange={handleChange}
                                className="border border-gray-300 rounded px-2 py-1"
                            >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            ) : (
                            <span className="px-3 py-1 rounded-full border border-[#205781] text-xs font-bold uppercase">
                                {user.role}
                            </span>
                            )}
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-center">
                            {editRowIndex === index ? (
                            <div className="flex justify-center gap-3">
                                <button
                                onClick={() => handleSave(index)}
                                className="text-green-600 font-semibold"
                                >
                                Save
                                </button>
                                <button
                                onClick={handleCancel}
                                className="text-red-600 font-semibold"
                                >
                                Cancel
                                </button>
                            </div>
                            ) : (
                            <button
                                onClick={() => handleEdit(user, index)}
                                className="text-[#205781] hover:underline inline-flex items-center gap-1 font-semibold"
                            >
                                <Edit2 size={14} /> Edit
                            </button>
                            )}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

        </>
    )
}

export default UserBody