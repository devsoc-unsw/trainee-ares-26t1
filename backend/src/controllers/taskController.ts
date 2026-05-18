import { Response } from "express";
import { CustomVariant, TaskType } from "../constants/taskConstants";
import DailyTask from "../classes/task/DailyTask";
import WeeklyTask from "../classes/task/WeeklyTask";
import EasyTask from "../classes/task/EasyTask";
import MediumTask from "../classes/task/MediumTask";
import HardTask from "../classes/task/HardTask";

export const createTask = async (req: any, res: Response) => {
  try {
    const { name, type } = req.body;
    const user = req.user;

    let task = null;
    let taskEntry = {};
    switch (type) {
      case TaskType.Daily: {
        task = new DailyTask(name);
        taskEntry = {
          id: task.getId(),
          name: task.getName(),
          type: task.getType(),
          amount: task.getAmount(),
        };
        break;
      }

      case TaskType.Weekly: {
        const { dayOfWk, deadline } = req.body;
        task = new WeeklyTask(name, dayOfWk, deadline);
        taskEntry = {
          id: task.getId(),
          name: task.getName(),
          type: task.getType(),
          amount: task.getAmount(),
          dayOfWk: task.getDayOfWk(),
          deadline: task.getDeadline(),
        };
        break;
      }

      case TaskType.Custom: {
        const { difficulty, deadline } = req.body;
        switch (difficulty) {
          case CustomVariant.Easy: {
            task = new EasyTask(name, deadline);
            break;
          }

          case CustomVariant.Medium: {
            task = new MediumTask(name, deadline);
            break;
          }

          case CustomVariant.Hard: {
            task = new HardTask(name, deadline);
            break;
          }

          default:
            return res.status(400).json({ error: "Invalid difficulty" });
        }

        taskEntry = {
          id: task.getId(),
          name: task.getName(),
          type: task.getType(),
          amount: task.getAmount(),
          difficulty: task.getDifficulty(),
          deadline: task.getDeadline(),
        }
      }

      default:
        return res.status(400).json({ error: "Invalid task type" });
    }

    user.tasks.push(taskEntry);
    await user.save();
    return res.status(201).json({ taskEntry });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
