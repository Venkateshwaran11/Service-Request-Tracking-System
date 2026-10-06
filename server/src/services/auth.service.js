import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const registerUser = async ({name,email,password,role})=> {
    const ExistingUser = await User.findOne({email});
    if(ExistingUser){
        throw new Error("User already exists");
    }
    const hashedPassword =await bcrypt.hash(password,10);
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role: role || "USER"
    })
    return {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user),
    }
}

const loginUser = async ({email,password}) =>{
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new Error("Invalid email or password")
    }
    const passwordMatch = await bcrypt.compare(password,user.password)
    if(!passwordMatch){
        throw new Error("Invalid email or password")
    }
    return {
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
        token:generateToken(user)
    }
}
export  {
    registerUser,
    loginUser
}