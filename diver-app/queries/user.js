import User from '@/lib/models/User.model'

export async function createUser(user){
    try{
        await User.create(user);
    } catch (e) {
        throw new Error(e);
    }
}

export async function findUserByEmail(email) {
    try {
        const user = User.find({email}).select('_id name email');
        return user;
    } catch (e){
        throw new Error(e);
    } 
}

export async function findAllUsers() {
    try {
        const user = User.find().lean();
        return user;
    } catch (e){
        throw new Error(e);
    } 
}
