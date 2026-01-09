import User from '@/lib/models/User.model'

export async function createUser(user){
    try{
        await User.create(user);
    } catch (e) {
        throw new Error(e);
    }
}