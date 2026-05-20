import CustomTaskFactory from "../../classes/task/CustomTaskFactory";
import DailyTask from "../../classes/task/DailyTask";
import WeeklyTask from "../../classes/task/WeeklyTask";
import { CustomVariant, TaskType } from "../../constants/taskConstants";

// Creates an object containing details for a task
export const createTaskEntry = (req: any, name: string, type: TaskType) => {
  console.log("type received:", type);
  console.log("TaskType.Daily:", TaskType.Daily);
  console.log("strict equal:", type === TaskType.Daily);
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
          task = CustomTaskFactory.createCustomTask(CustomVariant.Easy, name, deadline);
          break;
        }

        case CustomVariant.Medium: {
          task = CustomTaskFactory.createCustomTask(CustomVariant.Medium, name, deadline);
          break;
        }

        case CustomVariant.Hard: {
          task = CustomTaskFactory.createCustomTask(CustomVariant.Hard, name, deadline);
          break;
        }

        default:
          return { error: "Invalid difficulty" };
      }

      taskEntry = {
        id: task.getId(),
        name: task.getName(),
        type: task.getType(),
        amount: task.getAmount(),
        difficulty: task.getDifficulty(),
        deadline: task.getDeadline(),
      };
      break;
    }

    default:
      return { error: "Invalid task type" };
  }

  return taskEntry;
};
