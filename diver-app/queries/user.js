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

export async function findUserForPassword(email) {
    await dbConnect();
    
    try {
        const user = await User.findOne({ email })
        .select('password role')
        .lean(); 
        
        if(!user)
            return null;

        const safeUser = {
        ...user,
        _id: user._id.toString(),
        };

        return safeUser;
    } catch (e){
        throw new Error(e);
    } 
}


export async function findUserByEmail(email) {
    await dbConnect();
    
    try {
        const user = await User.findOne({email})
        .select('name email image notification password')
        .lean(); 
        
        if(!user)
            return null;

        const safeUser = {
        ...user,
        _id: user._id.toString(),
        };

        return safeUser;
    } catch (e){
        throw new Error(e);
    } 
}

export async function findAllUsers() {
    await dbConnect();
    try {
        const users = await User.find().select('name email role -_id').lean();
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
export async function changeUserEmail(email, changedEmail) {
    await dbConnect();
    try {
        const user = await User.findOne({email});
        user.email = changedEmail;
        await user.save();
    } catch (e) {
        throw new Error(e);
    }
}
export async function changeUserRole(email, role) {
    await dbConnect();
    try {
        const user = await User.findOne({email});
        user.role = role;
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

export async function changeUserNotification(email, condition) {
    await dbConnect();
    try {
        const user = await User.findOne({email});
        user.notification = condition;
        await user.save();
    } catch (e) {
        throw new Error(e);
    }
}
