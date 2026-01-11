import Activity from '@/lib/models/Activity.model'

export async function createActivity(activityDetails) {
    try{
        await Activity.create(activityDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllActivities(){
    try {
        const activities = Activity.findOne(email);
        return activities;
    } catch (e){
        throw new Error(e);
    }
}