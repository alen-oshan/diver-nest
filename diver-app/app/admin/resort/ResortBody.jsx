'use client';

import React, { useState } from 'react';
import { Bed, MapPin, Star, Plus, Check, X, Edit2, Trash2, Map } from 'lucide-react';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: 'Ocean Vista Suite',
      town: 'Trincomalee',
      address: '123 Beach Rd',
      mapUrl: 'https://maps.google.com/...',
      totalRooms: 5,
      reviewCount: 24,
      status: 'available',
      roomType: 'Private Room',
      pricePerNight: 120,
      rating: 4.8,
      description: 'A beautiful room with a sea view.',
      images: ['img1.jpg', 'img2.jpg'],
      amenities: ['WiFi', 'AC', 'Pool']
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (room) => {
    setIsAdding(false);
    setEditRowId(room.id);
    // Convert arrays back to comma-separated strings for easy editing
    setFormData({
      ...room,
      images: room.images.join(', '),
      amenities: room.amenities.join(', ')
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
    closeForm();
  };

  const closeForm = () => {
    setEditRowId(null);
    setIsAdding(false);
    setFormData({});
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

            {rooms.map((room) => (
              <React.Fragment key={room.id}>
                {editRowId === room.id ? (
                  <EditCard formData={formData} onChange={handleInputChange} onSave={saveChange} onCancel={closeForm} title="Edit Room Details" />
                ) : (
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

// Sub-component for the Edit/Add Interface
const EditCard = ({ formData, onChange, onSave, onCancel, title }) => (
  <tr className="bg-gray-50 border-b-2 border-[#205781]">
    <td colSpan="4" className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-4 flex justify-between items-center mb-2 border-b border-[#205781]/10 pb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex gap-2">
            <button onClick={onSave} className="bg-[#205781] text-white px-4 py-1.5 rounded flex items-center gap-1"><Check size={16}/> Save</button>
            <button onClick={onCancel} className="border border-[#205781] px-4 py-1.5 rounded flex items-center gap-1"><X size={16}/> Cancel</button>
          </div>
        </div>

        {/* Inputs */}
        <InputGroup label="Room Name" name="name" value={formData.name} onChange={onChange} />
        <InputGroup label="Town" name="town" value={formData.town} onChange={onChange} />
        <InputGroup label="Price/Night" name="pricePerNight" type="number" value={formData.pricePerNight} onChange={onChange} />
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Status</label>
          <select name="status" value={formData.status} onChange={onChange} className="p-2 border rounded bg-white">
            <option value="available">Available</option>
            <option value="not available">Not Available</option>
          </select>
        </div>

        <InputGroup label="Address" name="address" value={formData.address} onChange={onChange} />
        <InputGroup label="Map URL" name="mapUrl" value={formData.mapUrl} onChange={onChange} />
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Room Type</label>
          <select name="roomType" value={formData.roomType} onChange={onChange} className="p-2 border rounded bg-white">
            <option value="Private Room">Private Room</option>
            <option value="Shared Room">Shared Room</option>
          </select>
        </div>
        <InputGroup label="Rating (0-5)" name="rating" type="number" value={formData.rating} onChange={onChange} />

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Amenities (comma separated)</label>
          <input name="amenities" value={formData.amenities} onChange={onChange} className="p-2 border rounded" placeholder="WiFi, AC, Pool" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Images (comma separated links)</label>
          <input name="images" value={formData.images} onChange={onChange} className="p-2 border rounded" placeholder="url1, url2" />
        </div>

        <div className="md:col-span-4 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Description</label>
          <textarea name="description" value={formData.description} onChange={onChange} className="p-2 border rounded w-full" rows="2"></textarea>
        </div>
      </div>
    </td>
  </tr>
);

const InputGroup = ({ label, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase font-bold text-gray-500">{label}</label>
    <input className="p-2 border rounded" {...props} />
  </div>
);

export default RoomManagement;