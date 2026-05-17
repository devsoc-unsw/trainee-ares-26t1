import { CustomVariant, TaskType } from "../../constants/taskConstants";
import Task from "./Task";

class CustomTask extends Task {
  private difficulty: CustomVariant;
  private deadline: Date;

  constructor(name:string, deadline: Date, difficulty: CustomVariant) {
    super(name, TaskType.Custom);
    this.difficulty = difficulty;
    this.deadline = deadline;
  }

  getDifficulty(): CustomVariant {
    return this.difficulty;
  }

  getDeadline(): Date {
    return this.deadline;
  }

  setDifficulty(newDifficulty: CustomVariant): void {
    this.difficulty = newDifficulty;
  }

  setDeadline(newDeadline: Date): void {
    this.deadline = newDeadline;
  } 
}

export default CustomTask;