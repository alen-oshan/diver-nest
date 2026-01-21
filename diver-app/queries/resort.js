import Resort from '@/lib/models/Resort.model'
import dbConnect from '@/lib/db/mongoose'

export async function createResort(resortDetails) {
    await dbConnect();
    try{
        await Resort.create(resortDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllResorts(){
    await dbConnect();
    try {
        const resorts = await Resort.find().lean();
        return resorts;
    } catch (e){
        throw new Error(e);
    }
}

export async function findResortByName(name) {
    await dbConnect();
    try{
        const resort = await Resort.findOne({name}).select('-_id').lean();
        return resort;
        
    } catch(e){
        throw new Error(e);
    }
}