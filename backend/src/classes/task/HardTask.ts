import { HARD_AMOUNT } from "../../constants/taskConstants";
import { CustomVariant } from "../../constants/taskConstants";
import CustomTask from "./CustomTask";

class HardTask extends CustomTask {
  private amount: number;

  constructor(name: string, deadline: Date) {
    super(name, deadline, CustomVariant.Hard);
    this.amount = HARD_AMOUNT;
  }

  getAmount(): number {
    return this.amount;
  }
}

export default HardTask;