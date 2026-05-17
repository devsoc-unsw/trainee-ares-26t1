import { TaskType } from "../../constants/taskConstants";

class Task {
  private id: string;
  private name: string;
  private type: TaskType;
  private dateCreated: Date;

  constructor(name: string, type: TaskType) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.type = type;
    this.dateCreated = new Date();
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

  getDateCreated(): Date {
    return this.dateCreated;
  }

  setName(newName: string): void {
    this.name = newName;
  }
}

export default Task;