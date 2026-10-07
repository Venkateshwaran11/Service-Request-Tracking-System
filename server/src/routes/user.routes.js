import express from "express";

import { getAgentsList,getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/agents",getAgentsList);

router.get("/users",getAllUsers);

export default router;

