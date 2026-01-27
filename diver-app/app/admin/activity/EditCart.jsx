import React from 'react'
import { Check, X } from 'lucide-react';
import InputGroup from './InputGroup';

const EditCard = ({ formData, onChange, onSave, onCancel, title }) => (

  <tr className="bg-gray-50 border-b-2 border-[#205781]">
    <td colSpan="6" className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-4 flex justify-between items-center mb-2 border-b border-[#205781]/10 pb-2">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex gap-2">
            <button onClick={onSave} className="bg-[#205781] text-white px-4 py-1.5 rounded flex items-center gap-1"><Check size={16}/> Save</button>
            <button onClick={onCancel} className="border border-[#205781] px-4 py-1.5 rounded flex items-center gap-1"><X size={16}/> Cancel</button>
          </div>
        </div>

        {/* Inputs */}
        <InputGroup label="Activity Name" name="name" value={formData.name} onChange={onChange} />
        <InputGroup label="Town" name="town" value={formData.town} onChange={onChange} />
        <InputGroup label="Price" name="price" type="number" value={formData.price} onChange={onChange} />
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Type</label>
          <select name="type" value={formData.type ?? 'single'} onChange={onChange} className="p-2 border rounded bg-white">
            <option value="single">Single</option>
            <option value="group">Group</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Status</label>
          <select name="status" value={formData.status ?? 'available'} onChange={onChange} className="p-2 border rounded bg-white">
            <option value="available">Available</option>
            <option value="not available">Not Available</option>
          </select>
        </div>
        <InputGroup label="Total Seats" name="totalSeats" type="number" value={formData.totalSeats} onChange={onChange} />
        <InputGroup label="Duration (mins)" name="duration" type="number" value={formData.duration} onChange={onChange} />
        <InputGroup label="Rating (0-5)" name="rating" type="number" value={formData.rating} onChange={onChange} />
        <InputGroup label="Review Count" name="reviewCount" type="number" value={formData.reviewCount} onChange={onChange} />
        <InputGroup label="Map URL" name="mapUrl" value={formData.mapUrl} onChange={onChange} />

        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Available Times (comma separated)</label>
          <input name="availableTimes" value={formData.availableTimes ?? ''} onChange={onChange} className="p-2 border rounded" placeholder="9:00 AM, 2:00 PM, 5:00 PM" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Amenities (comma separated)</label>
          <input name="amenities" value={formData.amenities ?? ''} onChange={onChange} className="p-2 border rounded" placeholder="Equipment, Guide, Snacks" />
        </div>
        <div className="md:col-span-4 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Images (comma separated links)</label>
          <input name="images" value={formData.images ?? ''} onChange={onChange} className="p-2 border rounded" placeholder="url1, url2" />
        </div>
        <div className="md:col-span-4 flex flex-col gap-1">
          <label className="text-[10px] uppercase font-bold text-gray-500">Description</label>
          <textarea name="description" value={formData.description ?? ''} onChange={onChange} className="p-2 border rounded w-full" rows="2" maxLength="1000"></textarea>
        </div>

      </div>
    </td>
  </tr>
);

export default EditCard;