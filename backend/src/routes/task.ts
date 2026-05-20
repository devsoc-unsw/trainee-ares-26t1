import express from "express";
import { completeTask, createTask, deleteTask } from "../controllers/taskController";
import { authMiddleware } from "../controllers/helpers/authHelper";

const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.delete("/delete", authMiddleware, deleteTask);
router.post("/complete", authMiddleware, completeTask);

export default router;