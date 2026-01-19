import User from '@/lib/models/User.model'
import dbConnect from '@/lib/db/mongoose'

export async function createUser(user){
    await dbConnect();
    try{
        await User.create(user);
    } catch (e) {
        throw new Error(e);
    }
}

export async function findUserByEmail(email) {
    await dbConnect();
    try {
        const user = await User.findOne({email}).select('name email image role -_id').lean();
        return user;
    } catch (e){
        throw new Error(e);
    } 
}

export async function findAllUsers() {
    await dbConnect();
    try {
        const users = await User.find().lean();
        return users;
    } catch (e){
        throw new Error(e);
    } 
}

export async function changeUserName(email, name) {
    await dbConnect();
    try {
        const user = await User.findOne({email});
        user.name = name;
        await user.save();
    } catch (e) {
        throw new Error(e);
    }
}

export async function changeUserPassword(email, password) {
    await dbConnect();
    
    try {
        const user = await User.findOne({email});
        user.password = password;
        await user.save();
    } catch (e) {
        throw new Error(e);
    }
}
