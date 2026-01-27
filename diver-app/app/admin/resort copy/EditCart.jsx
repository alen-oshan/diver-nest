import React from 'react'
import { Check, X } from 'lucide-react';
import InputGroup from './InputGroup';

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
        <InputGroup label="Review Count" name="reviewCount" value={formData.reviewCount} onChange={onChange} />
        
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
        <InputGroup label="Address" name="address" value={formData.address} onChange={onChange} />
        <InputGroup label="Total Rooms" name="totalRooms" value={formData.totalRooms} onChange={onChange} />
        <div className="md:col-span-4 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Description</label>
          <textarea name="description" value={formData.description} onChange={onChange} className="p-2 border rounded w-full" rows="2"></textarea>
        </div>

      </div>
    </td>
  </tr>
);

export default EditCard;