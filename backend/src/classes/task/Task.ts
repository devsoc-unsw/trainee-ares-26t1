import { TaskType } from "../../constants/taskConstants";
import { v4 as uuidv4 } from "uuid";

class Task {
  private id: string;
  private name: string;
  private type: TaskType;


  constructor(name: string, type: TaskType) {
    this.id = Task.generateId();
    this.name = name;
    this.type = type;
  }

  private static generateId(): string {
  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
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