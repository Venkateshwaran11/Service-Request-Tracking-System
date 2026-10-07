import { getAgents,getUsers } from "../services/user.service.js";
import {successResponse} from "../utils/apiResponse.js"

const getAgentsList = async (req,res,next)=>{
    try{
        const agentsList = await getAgents();
        return successResponse(res,agentsList,"Agents fetched successfully")
    }catch(error){
        next(error)
    }
    
}

const getAllUsers = async (req,res,next)=>{
    try{
        const usersList = await getUsers();
        return successResponse(res,usersList,"Users fetched successfully")
    }catch(error){
        next(error)
    }
    
}

export {getAgentsList,getAllUsers}