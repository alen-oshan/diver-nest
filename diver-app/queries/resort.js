import Resort from '@/lib/models/Resort.model'
import { CallTracker } from 'assert';

export async function createResort(resortDetails) {
    try{
        await Resort.create(resortDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllResorts(){
    try {
        const resorts = Resort.find();
        return resorts;
    } catch (e){
        throw new Error(e);
    }
}

export async function findResortByName(name) {
    try{
        const resort = Resort.find({name});
        return resort;
    } catch(e){
        throw new Error(e);
    }
}