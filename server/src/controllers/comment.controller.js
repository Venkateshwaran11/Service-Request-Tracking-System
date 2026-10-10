import Comment from "../models/Comment.js";
import ServiceRequest from "../models/ServiceRequest.js";

import {
  successResponse,
  createdResponse
} from "../utils/apiResponse.js";

const addComment = async (req, res, next) => {
  try {
    const request = await ServiceRequest.findById(req.params.id);

    if (!request) {
      throw new Error("Service request not found");
    }

    const comment = await Comment.create({
      requestId: req.params.id,
      userId: req.user.id,
      message: req.body.message
    });

    const populatedComment = await comment.populate("userId", "name email role");

    return createdResponse(res, populatedComment, "Comment added successfully");
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ requestId: req.params.id })
      .populate("userId", "name email role")
      .sort({ createdAt: 1 });

    return successResponse(res, comments, "Comments fetched successfully");
  } catch (error) {
    next(error);
  }
};

export {
  addComment,
  getComments
};