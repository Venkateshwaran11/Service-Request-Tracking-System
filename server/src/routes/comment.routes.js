import express from "express";

import protect from "../middleware/auth.middleware.js";

import { addComment, getComments } from "../controllers/comment.controller.js";

const router = express.Router();

router.use(protect);

router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);

export default router;