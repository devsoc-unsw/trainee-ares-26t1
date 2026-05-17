import { CustomVariant } from "../../constants/taskConstants";
import EasyTask from "./EasyTask";
import HardTask from "./HardTask";
import MediumTask from "./MediumTask";

class CustomTaskFactory {
  static createCustomTask(type: CustomVariant, name: string, deadline: Date) {
    switch (type) {
      case CustomVariant.Easy:
        return new EasyTask(name, deadline);
      case CustomVariant.Medium:
        return new MediumTask(name, deadline);
      case CustomVariant.Hard:
        return new HardTask(name, deadline);
      default:
        throw new Error("Invalid task type");
    }
  }
}

export default CustomTaskFactory;