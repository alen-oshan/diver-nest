'use client';

import React, { useState } from 'react';
import { Bed, MapPin, Star, Plus, Check, X, Edit2, Trash2, Map } from 'lucide-react';
import EditCard from './EditCart';

const RoomManagement = ({resorts}) => {
  const [rooms, setRooms] = useState(resorts);
  const [isAdding, setIsAdding] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [originalName, setOriginalName] = useState(null);

  const handleEditClick = (room) => {
    setIsAdding(false);
    setIsUpdating(true);
    setEditRowId(room._id);
    setOriginalName(room.name);
    // Convert arrays back to comma-separated strings for easy editing
    const formattedRoom = {
      ...room,
      images: Array.isArray(room.images) ? room.images.join(', ') : room.images,
      amenities: Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities
    };
    setUpdateFormData(formattedRoom);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const sendFormData = async(formData) => {
    try {
      await fetch('/api/admin/resort', {
        body: JSON.stringify(formData),
        headers: {
          'Content-type':'application/json'
        },
        method: 'POST',
      })
    } catch (error) {
        console.error('Error sending edit form:', error);
        throw error;
    }
  }

  const sendUpdateData = async(formData) => {
    try {
      await fetch('/api/admin/resort', {
        body: JSON.stringify(formData),
        headers: {
          'Content-type':'application/json'
        },
        method: 'PUT',
      })
    } catch (error) {
        console.error('Error sending edit form:', error);
        throw error;
    }
  }

  const saveChange = () => {
    const formattedData = {
      ...formData,
      images: typeof formData.images === 'string' ? formData.images.split(',').map(s => s.trim()) : formData.images,
      amenities: typeof formData.amenities === 'string' ? formData.amenities.split(',').map(s => s.trim()) : formData.amenities,
    };

    if (isAdding) {
      setRooms([{ ...formattedData, id: Date.now() }, ...rooms]);
    } else {
      setRooms(rooms.map(r => r.id === editRowId ? formattedData : r));
    }
    sendFormData(formData)
    closeForm();
  };

  const updateChange = () => {
    const { _id, ...restData } = updateFormData;
    const formattedData = {
      ...restData,
      images: typeof updateFormData.images === 'string' ? updateFormData.images.split(',').map(s => s.trim()) : updateFormData.images,
      amenities: typeof updateFormData.amenities === 'string' ? updateFormData.amenities.split(',').map(s => s.trim()) : updateFormData.amenities,
    };

    setRooms(rooms.map(r => r._id === editRowId ? { ...formattedData, _id: editRowId } : r));
    sendUpdateData({ resortDetails: formattedData, prevName: originalName });
    closeForm();
  };

  const closeForm = () => {
    setEditRowId(null);
    setIsAdding(false);
    setIsUpdating(false);
    setFormData({});
    setUpdateFormData({});
    setOriginalName(null);
  };

  return (
    <div className="p-8 font-sans text-[#205781]">
      <header className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold uppercase tracking-tight">Admin - Resort Rooms</h2>
        {!isAdding && (
          <button 
            onClick={() => { setIsAdding(true); setEditRowId(null); setFormData({}); }}
            className="bg-[#205781] text-white px-6 py-2 rounded font-bold hover:opacity-90 transition-all"
          >
            + Add New Room
          </button>
        )}
      </header>

      <div className="bg-white border border-[#205781]/20 rounded-xl overflow-hidden shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#205781] text-white">
              <th className="p-4 font-semibold">Basic Info</th>
              <th className="p-4 font-semibold">Type & Price</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ADD NEW ROOM FORM */}
            {isAdding && <EditCard formData={formData} onChange={handleInputChange} onSave={saveChange} onCancel={closeForm} title="Add New Room" />}
            {isUpdating && <EditCard formData={updateFormData} onChange={handleUpdateChange} onSave={updateChange} onCancel={closeForm} title="Edit Room Details" />}

            {rooms.map((room, index) => (
              <React.Fragment key={room._id || index}>
                {editRowId === room._id ? null : (
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold">{room.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12}/> {room.town}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm italic">{room.roomType}</div>
                      <div className="font-bold text-lg">${room.pricePerNight}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${room.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleEditClick(room)}
                        className="text-[#205781] hover:underline font-bold flex items-center gap-1 mx-auto"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomManagement;