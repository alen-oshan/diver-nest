import Activity from '@/lib/models/Activity.model'
import dbConnect from '@/lib/db/mongoose'

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
        const activity = await Activity.findOne({name}).lean();
        return activity;
    } catch(e){
        throw new Error(e);
    }
}