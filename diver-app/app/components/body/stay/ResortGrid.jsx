import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import Price from './resort/ResortPrice'


const ResortGrid = (props) => {
    const [items, setItems] = useState([])
    const linkEndpoint = (props.isStay) ? 'stay' : 'enjoy';

    useEffect(() => {
      const fetchData = async () => {
        try {
          const endpoint = (props.isStay) ? '/api/resort' : '/api/activity';
          const response = await fetch(endpoint);
          const data = await response.json();
          setItems(props.isStay ? data.resortsDTO : data.activitiesDTO);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [props.isStay]);

    
    const filteredProducts = () => { 
      return props.isStay
      ? items.filter(item => item.roomType === props.selectedItemType)
      : items.filter(item => item.activityType === props.selectedItemType);
    }    
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {filteredProducts().map((resort, index) => (
              <Link 
                key={index} href={`/${linkEndpoint}/${encodeURIComponent(resort.name)}`}
                className="block"> 
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                     <Image
                        src={resort.image}                
                        alt="Beach resort"
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="p-6">
                    <h3 className="text-[22px] font-semibold mb-2">{resort.name}</h3>
                    <p className="text-[18px] text-gray-600 mb-3">{resort.town}</p>
                    
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-[20px] font-medium">{resort.rating}</span>
                        </div>
                        <div className="text-[24px] font-bold" style={{ color: '#205781' }}>
                        <Price price={resort.price}/>
                        <span className="text-[16px] text-gray-500 font-normal">/night</span>
                        </div>
                    </div>
                </div>
            </div>
            </Link>
            ))}
        </div>
    )
}

export default ResortGrid