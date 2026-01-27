'use client';

import React, { useState } from 'react';
import { MapPin, Clock, Users, Star, Edit2 } from 'lucide-react';
import EditCard from './EditCart';

const ActivityManagement = ({ activities }) => {
  const [activityList, setActivityList] = useState(activities);
  const [isAdding, setIsAdding] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({});
  const [originalName, setOriginalName] = useState(null);

  const handleEditClick = (activity) => {
    setIsAdding(false);
    setIsUpdating(true);
    setEditRowId(activity._id);
    setOriginalName(activity.name);
    // Convert arrays back to comma-separated strings for easy editing
    const formattedActivity = {
      ...activity,
      images: Array.isArray(activity.images) ? activity.images.join(', ') : activity.images,
      amenities: Array.isArray(activity.amenities) ? activity.amenities.join(', ') : activity.amenities,
      availableTimes: Array.isArray(activity.availableTimes) ? activity.availableTimes.join(', ') : activity.availableTimes
    };
    setUpdateFormData(formattedActivity);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const sendFormData = async (formData) => {
    try {
      await fetch('/api/admin/activity', {
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json'
        },
        method: 'POST',
      });
    } catch (error) {
      console.error('Error sending form:', error);
      throw error;
    }
  };

  const sendUpdateData = async (formData) => {
    try {
      await fetch('/api/admin/activity', {
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json'
        },
        method: 'PUT',
      });
    } catch (error) {
      console.error('Error sending update form:', error);
      throw error;
    }
  };

  const saveChange = () => {
    const formattedData = {
      ...formData,
      images: typeof formData.images === 'string' ? formData.images.split(',').map(s => s.trim()) : formData.images,
      amenities: typeof formData.amenities === 'string' ? formData.amenities.split(',').map(s => s.trim()) : formData.amenities,
      availableTimes: typeof formData.availableTimes === 'string' ? formData.availableTimes.split(',').map(s => s.trim()) : formData.availableTimes,
      price: Number(formData.price),
      totalSeats: Number(formData.totalSeats),
      duration: Number(formData.duration),
      rating: Number(formData.rating),
      reviewCount: Number(formData.reviewCount),
    };

    if (isAdding) {
      setActivityList([{ ...formattedData, id: Date.now() }, ...activityList]);
    } else {
      setActivityList(activityList.map(a => a.id === editRowId ? formattedData : a));
    }
    sendFormData(formattedData);
    closeForm();
  };

  const updateChange = () => {
    const { _id, ...restData } = updateFormData;
    const formattedData = {
      ...restData,
      images: typeof updateFormData.images === 'string' ? updateFormData.images.split(',').map(s => s.trim()) : updateFormData.images,
      amenities: typeof updateFormData.amenities === 'string' ? updateFormData.amenities.split(',').map(s => s.trim()) : updateFormData.amenities,
      availableTimes: typeof updateFormData.availableTimes === 'string' ? updateFormData.availableTimes.split(',').map(s => s.trim()) : updateFormData.availableTimes,
      price: Number(updateFormData.price),
      totalSeats: Number(updateFormData.totalSeats),
      duration: Number(updateFormData.duration),
      rating: Number(updateFormData.rating),
      reviewCount: Number(updateFormData.reviewCount),
    };

    setActivityList(activityList.map(a => a._id === editRowId ? { ...formattedData, _id: editRowId } : a));
    sendUpdateData({ activityDetails: formattedData, prevName: originalName });
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
        <h2 className="text-3xl font-bold uppercase tracking-tight">Admin - Activities</h2>
        {!isAdding && (
          <button
            onClick={() => { setIsAdding(true); setEditRowId(null); setFormData({}); }}
            className="bg-[#205781] text-white px-6 py-2 rounded font-bold hover:opacity-90 transition-all"
          >
            + Add New Activity
          </button>
        )}
      </header>

      <div className="bg-white border border-[#205781]/20 rounded-xl overflow-hidden shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#205781] text-white">
              <th className="p-4 font-semibold">Basic Info</th>
              <th className="p-4 font-semibold">Type & Price</th>
              <th className="p-4 font-semibold">Capacity & Duration</th>
              <th className="p-4 font-semibold">Rating</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* ADD NEW ACTIVITY FORM */}
            {isAdding && <EditCard formData={formData} onChange={handleInputChange} onSave={saveChange} onCancel={closeForm} title="Add New Activity" />}
            {isUpdating && <EditCard formData={updateFormData} onChange={handleUpdateChange} onSave={updateChange} onCancel={closeForm} title="Edit Activity Details" />}

            {activityList.map((activity, index) => (
              <React.Fragment key={activity._id || index}>
                {editRowId === activity._id ? null : (
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold">{activity.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={12} /> {activity.town}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm italic capitalize">{activity.type}</div>
                      <div className="font-bold text-lg">${activity.price}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm flex items-center gap-1"><Users size={12} /> {activity.totalSeats} seats</div>
                      <div className="text-sm flex items-center gap-1"><Clock size={12} /> {activity.duration} mins</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{activity.rating}</span>
                        <span className="text-xs text-gray-500">({activity.reviewCount})</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${activity.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleEditClick(activity)}
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

export default ActivityManagement;