import { EASY_AMOUNT } from "../../constants/taskConstants";
import { CustomVariant } from "../../constants/taskConstants";
import CustomTask from "./CustomTask";

class EasyTask extends CustomTask {
  private amount: number;

  constructor(name: string, deadline: Date) {
    super(name, deadline, CustomVariant.Easy);
    this.amount = EASY_AMOUNT;
  }

  getAmount(): number {
    return this.amount;
  }
}

export default EasyTask;