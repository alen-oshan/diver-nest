import React from 'react'
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";


const resorts = [
  {
    id: 1,
    name: 'Sunset Beach Resort',
    town: 'Malibu',
    price: 150,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjgxNDI2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Shared Room',
  },
  {
    id: 2,
    name: 'Mountain View Lodge',
    town: 'Aspen',
    price: 320,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydHxlbnwxfHx8fDE3NjgyMDAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Private Room',
  },
  {
    id: 3,
    name: 'Grand Luxury Hotel',
    town: 'Miami',
    price: 280,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjgxMTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Private Room',
  },
  {
    id: 4,
    name: 'Tropical Paradise Resort',
    town: 'Honolulu',
    price: 120,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydHxlbnwxfHx8fDE3NjgyMDAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Shared Room',
  },
];

const activities = [
  {
    id: 1,
    name: 'Doplhine Watching',
    town: 'Malibu',
    price: 150,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjgxNDI2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Group',
  },
  {
    id: 2,
    name: 'Whales Watching',
    town: 'Aspen',
    price: 320,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHJlc29ydHxlbnwxfHx8fDE3NjgyMDAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Group',
  },
  {
    id: 3,
    name: 'Snorkeling',
    town: 'Miami',
    price: 280,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwxfHx8fDE3NjgxMTg0Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Individual',
  },
  {
    id: 4,
    name: 'Diving',
    town: 'Honolulu',
    price: 120,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMHJlc29ydHxlbnwxfHx8fDE3NjgyMDAwODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    roomType: 'Individual',
  },
];

const ResortGrid = (props) => {

    
    const filteredProducts = () => {
        if(props.pathname==='/stay') {
            return resorts.filter(
                (resort) => resort.roomType === props.selectedRoomType
            );
        } else {
            return activities.filter(
                (activity) => activity.roomType === props.selectedRoomType
            );
        }
    }
    
    

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {filteredProducts().map((resort) => (
              <Link 
                key={resort.id} href={`/stay/${encodeURIComponent(resort.name)}`}
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
                        ${resort.price}
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