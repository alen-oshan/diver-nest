import ActivityHeader from "./ActivityHeader"
import ImageGallery from "@/app/components/body/stay/ImageGallery"
import ActivityInfo from "./ActivityInfo"

const ActivityBody = ({activity}) => {

      return (
        <div className="max-w-7xl mx-auto p-6">
          <ActivityHeader activity={activity}/>          

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ImageGallery activity={activity}/>
            <ActivityInfo activity={activity}/>            
          </div>
        </div>
      );
}

export default ActivityBody