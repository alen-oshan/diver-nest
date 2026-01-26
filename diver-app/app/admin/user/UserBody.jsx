'use client';

import React, { useState } from 'react'
import { Edit2, Plus, Check, X } from 'lucide-react';

const UserBody = (props) => {

    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
    });
    const [users, setUsers] = useState(props.users)
    const [isAdding, setIsAdding] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        role: "",
        password: "",
    });

    const handleAddNewClick = () => {
        setEditRowIndex(null);
        setIsAdding(true);
        setEditForm({ name: '', email: '', role: 'admin', password: '' });
    };

    const handleConfirmAdd = () => {
        sendNewUser()
    };

    const sendNewUser = async() => {
        try {
            await fetch('/api/admin/user', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser)
            });
        } catch (error) {
            console.error('Error sending user details', error);
            throw error;
        }
    }

    const sendEditForm = async (prevEmail, editForm) => {
        const reqBody = {editForm, prevEmail}
        try {
            await fetch('/api/admin/user', {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqBody)
            });
        } catch (error) {
            console.error('Error sending edit form:', error);
            throw error;
        }
    };

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

    const handleNewUserChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSave = (index) => {
        const updatedUsers = [...users];
        updatedUsers[index] = { ...updatedUsers[index], ...editForm };
        sendEditForm(users[index].email, editForm);
        setUsers(updatedUsers); 
        setEditRowIndex(null);
    };

    const handleCancel = () => {
        setEditRowIndex(null);
        setIsAdding(false);
    };

    return (
        <>
        <header className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold text-[#205781]">User Management</h2>
            {!isAdding && (
                <button 
                    onClick={handleAddNewClick}
                    className="bg-[#205781] text-white px-6 py-2 rounded shadow-sm hover:opacity-90 flex items-center gap-2"
                >
                    <Plus size={18} /> Add New User
                </button>
            )}
        </header>

        <div className="bg-white border border-[#205781]/20 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-[#205781] text-white">
                <th className="p-4 font-semibold">User Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Password</th>
                <th className="p-4 font-semibold text-center">Actions</th>
                </tr>
            </thead>

            <tbody>
                {/* NEW USER ROW */}
                {isAdding && (
                <tr className="bg-blue-50/50 border-b border-[#205781]/20">
                    <td className="p-4">
                    <input name="name" placeholder="Full Name" value={newUser.name} onChange={handleNewUserChange} className="border border-[#205781]/30 rounded px-2 py-1 w-full outline-none focus:ring-1 ring-[#205781]" />
                    </td>
                    <td className="p-4">
                    <input name="email" placeholder="Email" value={newUser.email} onChange={handleNewUserChange} className="border border-[#205781]/30 rounded px-2 py-1 w-full outline-none focus:ring-1 ring-[#205781]" />
                    </td>
                    <td className="p-4">
                    <select name="role" value={newUser.role} onChange={handleNewUserChange} className="border border-[#205781]/30 rounded px-2 py-1 w-full bg-white text-[#205781]">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    </td>
                    <td className="p-4">
                    <input name="password" type="password" placeholder="Password" value={newUser.password} onChange={handleNewUserChange} className="border border-[#205781]/30 rounded px-2 py-1 w-full outline-none focus:ring-1 ring-[#205781]" />
                    </td>
                    <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                        <button onClick={handleConfirmAdd} className="text-green-600 font-semibold flex items-center gap-1 hover:underline"> Save</button>
                        <button onClick={handleCancel} className="text-red-600 font-semibold flex items-center gap-1 hover:underline"> Cancel</button>
                    </div>
                    </td>
                </tr>
                )}

                {/* EXISTING USERS LIST */}
                {users.map((user, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                    {editRowIndex === index ? (
                        <input name="name" value={editForm.name} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-full" />
                    ) : user.name}
                    </td>
                    <td className="p-4">
                    {editRowIndex === index ? (
                        <input name="email" value={editForm.email} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-full" />
                    ) : user.email}
                    </td>
                    <td className="p-4">
                    {editRowIndex === index ? (
                        <select name="role" value={editForm.role} onChange={handleChange} className="border border-gray-300 rounded px-2 py-1">
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        </select>
                    ) : (
                        <span className="px-3 py-1 rounded-full border border-[#205781] text-xs font-bold uppercase">{user.role}</span>
                    )}
                    </td>
                    <td className="p-4">
                    {editRowIndex === index ? (
                        <input name="password" type="password" placeholder="New Password" onChange={handleChange} className="border border-gray-300 rounded px-2 py-1 w-full" />
                    ) : "••••••••"}
                    </td>
                    <td className="p-4 text-center">
                    {editRowIndex === index ? (
                        <div className="flex justify-center gap-3">
                        <button onClick={() => handleSave(index)} className="text-green-600 font-semibold hover:underline">Update</button>
                        <button onClick={handleCancel} className="text-red-600 font-semibold hover:underline">Cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => handleEdit(user, index)} className="text-[#205781] hover:underline inline-flex items-center gap-1 font-semibold">
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
    );
};

export default UserBody