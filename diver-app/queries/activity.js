import Activity from '@/lib/models/Activity.model'
import dbConnect from '@/lib/db/mongoose'
import { getReservesByName } from './reserve'

export async function createActivity(activityDetails) {
    await dbConnect();
    try{
        await Activity.create(activityDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllActivities(){
    await dbConnect();
    try {
        const activities = await Activity.find().lean();
        return activities;
    } catch (e){
        throw new Error(e);
    }
}

export async function findActivityByName(name) {
    await dbConnect(); 
    try{
        const activity = await Activity.findOne({name}).select('-_id').lean();
        const reserves = await getReservesByName(name);
        return {...activity, reserves};
    } catch(e){
        throw new Error(e);
    }
}

export async function updateActivityByName(name, activityDetails) {
    await dbConnect();
    try {
        const updatedActivity = await Activity.findOneAndUpdate(
            { name }, // Filter by name
            { $set: activityDetails }, // Update with the provided details
        ).lean();

        if (!updatedActivity) {
            throw new Error(`Resort with name "${name}" not found.`);
        }
    } catch (e) {
        throw new Error(e);
    }
}