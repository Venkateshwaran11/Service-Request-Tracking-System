import express from "express";

import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
  assignRequest,
  updateStatus
} from "../controllers/request.controller.js";

import {
  addComment,
  getComments
} from "../controllers/comment.controller.js";

const router = express.Router();

router.use(protect);

// Requests
router.post("/",authorize("USER", "ADMIN"),createRequest);

router.get("/", getRequests);

router.get("/:id", getRequest);

router.put("/:id", authorize("USER", "ADMIN"), updateRequest);

router.delete("/:id", authorize("USER", "ADMIN"), deleteRequest);

// Admin
router.put("/:id/assign", authorize("ADMIN"), assignRequest);

// Agent/Admin
router.put("/:id/status", authorize("AGENT", "ADMIN"), updateStatus);

// Comments
router.post("/:id/comments",addComment);

router.get("/:id/comments", getComments);

export default router;