import { MEDIUM_AMOUNT } from "../../constants/taskConstants";
import { CustomVariant } from "../../constants/taskConstants";
import CustomTask from "./CustomTask";

class MediumTask extends CustomTask {
  private amount: number;

  constructor(name: string, deadline: Date) {
    super(name, deadline, CustomVariant.Medium);
    this.amount = MEDIUM_AMOUNT;
  }

  getAmount(): number {
    return this.amount;
  }
}

export default MediumTask;