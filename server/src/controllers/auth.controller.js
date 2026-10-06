import {registerUser,loginUser} from "../services/auth.service.js"
import {successResponse,createdResponse} from "../utils/apiResponse.js";

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    return createdResponse(res,user,"User registered successfully");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    return successResponse(res,user,"Login successful");
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    return successResponse(res,req.user,"Current user");
  } catch (error) {
    next(error);
  }
};

export {
  register,
  login,
  getMe
};