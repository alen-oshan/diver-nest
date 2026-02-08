import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import Price from './resort/ResortPrice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ResortGrid = (props) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
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
        } finally {
          setLoading(false);
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
            {loading ? (
              Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-64 overflow-hidden">
                    <Skeleton height="100%" />
                  </div>
                  <div className="p-6">
                    <Skeleton height={28} width="60%" className="mb-2" />
                    <Skeleton height={20} width="40%" className="mb-3" />
                    <div className="flex items-center justify-between">
                      <Skeleton height={20} width="30%" />
                      <Skeleton height={28} width="30%" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              filteredProducts().map((resort, index) => (
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
                        </div>
                        <div className="text-[24px] font-bold" style={{ color: '#205781' }}>
                          <Price price={resort.price}/>
                          <span className="text-[16px] text-gray-500 font-normal">{props.isStay ? '/night' : '/person'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
        </div>
    );
};

export default ResortGrid