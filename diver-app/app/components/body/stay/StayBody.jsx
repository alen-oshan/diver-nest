'use client';

import { useState } from 'react';
import FilterButtons from '@/app/components/body/stay/FilterButtons'
import ResortGrid from '@/app/components/body/stay/ResortGrid'
import { usePathname } from 'next/navigation'

export default function StayBody() {
  // get the url called
  const pathname = usePathname();
  const isStay = pathname === '/stay' ? true : false;

  const [selectedItemType, setSelectedItemType] = useState( 
    isStay ? 'Shared Room':'Single'
  );
  const buttonTypes = 
    isStay ? ['Shared Room', 'Private Room'] : ['Single', 'Group'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-16 md:px-16 lg:px-24">
      <FilterButtons 
        setSelectedItemType={setSelectedItemType}
        selectedItemType={selectedItemType}
        buttonTypes={buttonTypes}
      />
      <ResortGrid 
        selectedItemType={selectedItemType}
        isStay={isStay} 
      />  
    </div>
  );
}
