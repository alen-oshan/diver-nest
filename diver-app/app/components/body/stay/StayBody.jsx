'use client';

import { useState } from 'react';
import FilterButtons from '@/app/components/body/stay/FilterButtons'
import ResortGrid from '@/app/components/body/stay/ResortGrid'

export default function StayBody() {
  const [selectedRoomType, setSelectedRoomType] = useState('shared');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8 md:px-16 lg:px-24">
      <FilterButtons 
        setSelectedRoomType={setSelectedRoomType}
        selectedRoomType={selectedRoomType}
      />
      <ResortGrid selectedRoomType={selectedRoomType}/>  
    </div>
  );
}
