'use client'

import dynamic from 'next/dynamic'
import ResortHeader from "./ResortHeader"
import ImageGallery from "../ImageGallery"

const ResortInfo = dynamic(() => import('./ResortInfo'), {
  ssr: false,
  loading: () => (
    <div className="lg:col-span-1">
      <div className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
        <div className="h-10 bg-gray-200 rounded mb-3" />
        <div className="h-10 bg-gray-200 rounded mb-3" />
        <div className="h-12 bg-gray-200 rounded" />
      </div>
    </div>
  ),
})

const ResortBody = ({resort}) => {

      return (
        <div className="max-w-7xl mx-auto p-6">
          <ResortHeader resort={resort}/>          

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ImageGallery resort={resort}/>
            <ResortInfo resort={resort}/>            
          </div>
        </div>
      );
}

export default ResortBody