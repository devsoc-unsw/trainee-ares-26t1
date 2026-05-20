import { Response } from "express";
import { createTaskEntry } from "./helpers/taskHelper";
import { TaskType } from "../constants/taskConstants";

export const createTask = async (req: any, res: Response) => {
  try {
    const { name, type } = req.body;
    console.log("createTask body:", req.body);
    const user = req.user;

    const taskEntry = createTaskEntry(req, name, type);
    if ("error" in taskEntry) {
      return res.status(400).json(taskEntry);
    }

    // Append task to user and update db
    user.tasks.push(taskEntry);
    await user.save();
    return res.status(201).json(taskEntry);
  } catch (err) {
    console.error("createTask error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTask = async (req: any, res: Response) => {
  try {
    const { id: taskId } = req.body;
    const user = req.user;

    // Find the index where the to-be-deleted task is
    const taskIndex = user.tasks.findIndex(
      (currTask: any) => currTask.id === taskId,
    );
    if (!taskIndex) {
      return res.status(403).json({ error: "Task does not belong to user" });
    }

    // Find task from user and remove then update db.
    user.tasks.splice(taskIndex, 1);
    await user.save();
    return res.status(200).json({});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const completeTask = async (req: any, res: Response) => {
  try {
    const { id } = req.body;
    const user = req.user;

    const task = user.tasks.find((t: any) => t.id === id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    user.money += task.amount;

    if (task.type === TaskType.Custom) {
      user.tasks = user.tasks.filter((t: any) => t.id !== id);
    } else {
      task.lastCompleted = new Date();
    }

    await user.save();
    return res.status(200).json({ user });
  } catch (err) {
    console.error("completeTask error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
