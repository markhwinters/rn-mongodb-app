import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/tasks", protectRoute, getTasks);
router.post("/task", protectRoute, createTask);
router.put("/tasks", protectRoute, updateTask);
router.delete("/tasks", protectRoute, deleteTask);

export default router;
