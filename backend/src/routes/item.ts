import express from "express";
import { authMiddleware } from "../controllers/helpers/authHelper";
import { buyItem } from "../controllers/itemController";

const router = express.Router();

router.post("/buy", authMiddleware, buyItem);

export default router;