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
        const user = await User.findOne({email}).select('_id name email password role');
        return user;
    } catch (e){
        throw new Error(e);
    } 
}

export async function findAllUsers() {
    try {
        const users = await User.find().lean();
        return users;
    } catch (e){
        throw new Error(e);
    } 
}
