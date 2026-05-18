import express from "express";
import { createTask, deleteTask } from "../controllers/taskController";
import { authMiddleware } from "../controllers/helpers/authHelper";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.delete("/delete", authMiddleware, deleteTask);

export default router;