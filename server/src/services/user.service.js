import User from "../models/User.js";

const getAgents = async ()=>{
    return User.find({
        role:"AGENT"
    }).select("-password")
};

const getUsers = async () => {
    return User.find().select("-password");
}

export {getAgents, getUsers};