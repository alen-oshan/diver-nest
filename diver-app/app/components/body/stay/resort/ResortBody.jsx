'use client';

import ResortHeader from "./ResortHeader"
import ImageGallery from "../ImageGallery"
import ResortInfo from "./ResortInfo"

const ResortBody = ({resort}) => {

      return (
        <div className="max-w-7xl mx-auto p-6">
          <ResortHeader resort={resort}/>          

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ImageGallery resort={resort}/>
            <ResortInfo resort={resort}/>            
          </div>
        </div>
      );
}

export default ResortBody