import express from "express";
import { getUser, resetUser, updateCatType, updateMap, updateUser } from "../controllers/userController";
import { authMiddleware } from "../controllers/helpers/authHelper";

const router = express.Router();

router.get("/fetchUser", authMiddleware, getUser);
router.put("/update/reset", authMiddleware, resetUser);
router.put("/update/cat", authMiddleware, updateCatType);
router.put("/update/map", authMiddleware, updateMap);
router.put("/update", authMiddleware, updateUser);

export default router;