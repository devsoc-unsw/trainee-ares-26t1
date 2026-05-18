import { TaskType } from "../../constants/taskConstants";

class Task {
  private id: string;
  private name: string;
  private type: TaskType;

  constructor(name: string, type: TaskType) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): TaskType {
    return this.type;
  }

  setName(newName: string): void {
    this.name = newName;
  }
}

export default Task;