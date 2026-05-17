import { WEEKLY_AMOUNT } from "../../constants/taskConstants";
import { DayOfWk, TaskType } from "../../constants/taskConstants";
import Task from "./Task";

class WeeklyTask extends Task {
  private amount: number;
  private dayOfWk: DayOfWk;
  private deadline: Date;

  constructor(name: string, dayOfWk: DayOfWk, deadline: Date) {
    super(name, TaskType.Weekly);
    this.amount = WEEKLY_AMOUNT;
    this.dayOfWk = dayOfWk;
    this.deadline = deadline;
  }

  getAmount(): number {
    return this.amount;
  }

  getDayOfWk(): DayOfWk {
    return this.dayOfWk;
  }

  getDeadline(): Date {
    return this.deadline;
  }

  setDayofWk(newDayOfWk: DayOfWk): void {
    this.dayOfWk = newDayOfWk;
  }

  setDeadline(newDeadline: Date): void {
    this.deadline = newDeadline;
  }
}

export default WeeklyTask;