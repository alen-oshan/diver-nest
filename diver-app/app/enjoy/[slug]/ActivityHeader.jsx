import React from 'react'
import {MapPin} from 'lucide-react'

const ResortHeader = ({activity}) => {


    return ( 
        <div className="mb-8">
            <h1 className="mb-2 text-2xl">{activity.name}</h1>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{activity.town}</span>
              </div>
              <div>
                <span className="text-gray-400">• </span>
                <a
                  href={activity.googleMapsUrl}
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