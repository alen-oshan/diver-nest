import Resort from '@/lib/models/Resort.model'

export async function createResort(resortDetails) {
    try{
        await Resort.create(resortDetails);
    } catch (e) {
        throw new Error(e);
    } 
}

export async function findAllResorts(){
    try {
        const resorts = Resort.findAlle();
        return resorts;
    } catch (e){
        throw new Error(e);
    }
}