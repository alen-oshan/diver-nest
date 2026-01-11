import User from '@/lib/models/User.model'

export async function createUser(user){
    try{
        await User.create(user);
    } catch (e) {
        throw new Error(e);
    }
}

export async function findOneUser(email) {
    try {
        const user = User.findOne(email);
        return user;
    } catch (e){
        throw new Error(e);
    }
    
}