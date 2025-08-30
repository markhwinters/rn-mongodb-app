import asyncHandler from "express-async-handler";

import User from "../models/User.js";
import Task from "../models/Task.js";

import { getAuth } from "@clerk/express";

export const getTasks = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const tasks = await Task.find({ user: user._id }).sort({ createdAt: -1 });

  res.status(200).json({ tasks });
});

export const createTask = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { title } = req.body;

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const task = await Task.create({
    user: user._id,
    title: title,
  });

  res.status(201).json({ task });
});

export const updateTask = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { taskId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  //const task = await Task.findById(taskId);

  if (!user) return res.status(404).json({ error: "User not found" });

  const task = await User.findOneAndUpdate({ user: user._id }, req.body, {
    new: true,
  });

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.status(200).json({ task });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { taskId } = req.params;

  const user = await User.findOne({ clerkId: userId });
  if (!user) return res.status(404).json({ error: "User not found" });

  const task = await Task.findOneAndDelete({ _id: taskId, user: user._id });

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.status(200).json({ message: "Tasl deleted successfully" });
});
