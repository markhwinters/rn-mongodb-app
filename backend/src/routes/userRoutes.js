import express from "express";
import {
  getUser,
  syncUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sync", protectRoute, syncUser);
router.get("/profile", protectRoute, getUser);
router.put("/profile", protectRoute, updateUser);
router.delete("/profile", protectRoute, deleteUser);

export default router;
