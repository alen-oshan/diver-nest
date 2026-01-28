import React, {useState} from 'react'

const AddNewForm = ({setIsAdding, setShowPopup}) => {
    const [formData, setFormData] = useState(
        { name: '', email: '', type: 'stay', details: '', checkIn: '', checkOut: '', activityDate: '' });
    const [type, setType] = useState('stay')

    const resorts = [
      "Blue Water Resort", 
      "Ocean Breeze Villa", 
      "Sunset Palms Hotel", 
      "Mountain Peak Lodge", 
      "Coral Reef Suites"
    ];

    const handleAddBooking = (e) => {
        e.preventDefault();

        let formattedData = { 
            name: formData.name, 
            email: formData.email,
            quantity: formData.quantity,
            type: formData.type,
        };

        if (formData.type === 'stay') {
            formattedData = {
                ...formattedData,
                checkIn: formData.checkIn,
                checkOut: formData.checkOut,
            };
        } else {
            formattedData = {
                ...formattedData,
                activityDate: formData.activityDate,
            };
        }

        sendReserve(formattedData);
        setIsAdding(false);
        setShowPopup(false);
    };

    const sendReserve = async (form) => {
        await fetch('/api/admin/reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });
    }


    return (
        type === 'stay' ?
            <form onSubmit={handleAddBooking} className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                {/* Resort Selection */}
                <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Available Resorts
                </label>
                <select 
                    required 
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white focus:ring-2 focus:ring-[#205781]/20 transition-all cursor-pointer" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                >
                    <option value="" disabled>Select a resort</option>
                    {resorts.map((resort) => (
                    <option key={resort} value={resort}>
                        {resort}
                    </option>
                    ))}
                </select>
                </div>

                {/* Row 1: Check-in & Check-out */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Check-in</label>
                    <input 
                        type="date" 
                        required 
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#205781]" 
                        value={formData.checkIn || ''} 
                        onChange={e => setFormData({...formData, checkIn: e.target.value})} 
                    />
                    </div>
                    <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Check-out</label>
                    <input 
                        type="date" 
                        required 
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#205781]" 
                        value={formData.checkOut || ''} 
                        onChange={e => setFormData({...formData, checkOut: e.target.value})} 
                    />
                    </div>
                </div>

                {/* Row 2: Quantity & Amount */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rooms / Persons</label>
                    <input 
                        type="number" 
                        required 
                        placeholder="1"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none" 
                        value={formData.quantity || ''} 
                        onChange={e => setFormData({...formData, quantity: e.target.value})} 
                    />
                    </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                    <input 
                    type="email" 
                    required 
                    placeholder="guest@example.com"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    />
                </div>

                {/* Type Selection */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Booking Type</label>
                    <select 
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white cursor-pointer" 
                    value={formData.type} 
                    onChange={e => {setType(e.target.value); setFormData({...formData, type: e.target.value})}}
                    >
                    <option value="stay">Stay</option>
                    <option value="activity">Activity</option>
                    </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                    <button 
                    type="submit" 
                    className="w-full bg-[#205781] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#1a4669] transition-all active:scale-[0.98]"
                    >
                    Save Reservation
                    </button>
                </div>
                </form>
            :   <form onSubmit={handleAddBooking} className="space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                    {/* Guest Name */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Guest Name</label>
                        <input 
                        required 
                        placeholder="Guest Full Name"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-[#205781]/20 transition-all" 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        />
                    </div>

                    {/* Row 1: Activity Date & Time Slot */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Activity Date</label>
                        <input 
                            type="date" 
                            required 
                            className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#205781]" 
                            value={formData.activityDate || ''} 
                            onChange={e => setFormData({...formData, activityDate: e.target.value})} 
                        />
                        </div>
                    </div>

                    {/* Row 2: Participants & Amount */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No. of Participants</label>
                        <input 
                            type="number" 
                            required 
                            placeholder="1"
                            className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none" 
                            value={formData.quantity || ''} 
                            onChange={e => setFormData({...formData, quantity: e.target.value})} 
                        />
                        </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                        <input 
                        type="email" 
                        required 
                        placeholder="guest@email.com"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none" 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        />
                    </div>

                    {/* Activity Type Selection */}
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Activity Category</label>
                        <select 
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-sm outline-none bg-white" 
                        value={formData.type} 
                        onChange={e => {setType(e.target.value); setFormData({...formData, type: e.target.value})}}
                        >
                        <option value="activity">Activity</option>
                        <option value="stay">Stay</option>
                        </select>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2">
                        <button 
                        type="submit" 
                        className="w-full bg-[#205781] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#1a4669] transition-all"
                        >
                        Book Activity
                        </button>
                    </div>
                    </form>
              
  )
}

export default AddNewForm;