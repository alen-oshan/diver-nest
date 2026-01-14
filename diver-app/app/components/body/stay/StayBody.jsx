'use client';

import { useState } from 'react';
import FilterButtons from '@/app/components/body/stay/FilterButtons'
import ResortGrid from '@/app/components/body/stay/ResortGrid'
import { usePathname } from 'next/navigation'

export default function StayBody() {
  // get the url called
  const pathname = usePathname() 

  const [selectedRoomType, setSelectedRoomType] = useState( 
    pathname === '/stay' ? 'Shared Room':'Individual');
  const buttonTypes = 
    pathname === '/stay' ? ['Shared Room', 'Private Room'] : ['Individual', 'Group'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-16 md:px-16 lg:px-24">
      <FilterButtons 
        setSelectedRoomType={setSelectedRoomType}
        selectedRoomType={selectedRoomType}
        buttonTypes={buttonTypes}
      />
      <ResortGrid 
        selectedRoomType={selectedRoomType}
        pathname={pathname}
      />  
    </div>
  );
}
