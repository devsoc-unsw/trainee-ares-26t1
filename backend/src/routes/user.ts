import express from "express";
import { getUser } from "../controllers/userController";
import { authMiddleware } from "../controllers/helpers/authHelper";

const router = express.Router();

router.get("/fetchData", authMiddleware, getUser);

export default router;