import React from 'react'
import {MapPin} from 'lucide-react'

const ResortHeader = ({resort}) => {


    return (
        <div className="mb-8">
            <h1 className="mb-2 text-2xl">{resort.name}</h1>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{resort.address}</span>
              </div>
              <div>
                <span className="text-gray-400">• </span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resort.address || resort.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
        </div>
    )
}

export default ResortHeader