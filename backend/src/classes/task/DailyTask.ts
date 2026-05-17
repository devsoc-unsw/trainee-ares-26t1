import { DAILY_AMOUNT } from "../../constants/taskConstants";
import { TaskType } from "../../constants/taskConstants";
import Task from "./Task";

class DailyTask extends Task {
  private amount: number;

  constructor(name: string) {
    super(name, TaskType.Daily);
    this.amount = DAILY_AMOUNT;
  }

  getAmount(): number {
    return this.amount;
  }
}

export default DailyTask;