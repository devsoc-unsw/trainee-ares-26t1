import { ItemType } from "../../constants/itemConstants";
import { CatType, MAX_BOARD_SIZE } from "../../constants/userContants";
import Task from "../task/Task";

class User {
  private id: string;
  private email: string;
  private password: string;
  private money: number;
  private sprite: CatType;

  // Number indicates the z-index
  // Layer 0: for rugs and other items that cats can overlap
  // Layer 1: for cats
  // Layer 2: for furniture and/or static objects
  // Coordinate of an item is represented by the top left of the occupying area.
  // Eg: A table that spans 2 x 2 can have a (1, 1). This means that is spans from
  //     (1, 1) to (2, 2).
  private layer0: ItemType[][]; 
  private layer1: CatType[][]; // Assumes that only cats will be on this layer
  private layer2: ItemType[][];
  
  private inventory: Map<ItemType, number>;
  private tasks: Task[];

  // For when user goes into debt
  private debtStartDate: Date | null;

  constructor(email: string, password: string, money: number, sprite: CatType) {
    this.id = crypto.randomUUID();
    this.email = email;
    this.password = password;
    this.money = 0;
    this.sprite = sprite;
    this.layer0 = Array.from({ length: MAX_BOARD_SIZE }, () => {
      return Array(MAX_BOARD_SIZE).fill(null);
    });
    this.layer1 = Array.from({ length: MAX_BOARD_SIZE }, () => {
      return Array(MAX_BOARD_SIZE).fill(null);
    });
    this.layer2 = Array.from({ length: MAX_BOARD_SIZE }, () => {
      return Array(MAX_BOARD_SIZE).fill(null);
    });
    this.inventory = new Map<ItemType, number>();
    this.tasks = [];
    this.debtStartDate = null;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }
  
  getPassword(): string {
    return this.password;
  }

  getMoney(): number {
    return this.money;
  }
  
  getSprite(): CatType {
    return this.sprite;
  }

  getLayer0(): ItemType[][] {
    return this.layer0;
  }

  getLayer1(): CatType[][] {
    return this.layer1;
  }

  getLayer2(): ItemType[][] {
    return this.layer2;
  }

  getInventory(): Map<ItemType, number> {
    return this.inventory;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getDebtStartDate(): Date | null {
    return this.debtStartDate;
  }

  setMoney(newMoney: number): void {
    this.money = newMoney;
  }

  setLayer0(newLayer0: ItemType[][]): void {
    this.layer0 = newLayer0;
  }

  setLayer1(newLayer1: CatType[][]): void {
    this.layer1 = newLayer1;
  }

  setLayer2(newLayer2: ItemType[][]): void {
    this.layer2 = newLayer2;
  }

  setInventory(newInventory: Map<ItemType, number>): void {
    this.inventory = newInventory;
  }

  setTasks(newTasks: Task[]): void {
    this.tasks = newTasks;
  }
  
  setDebtStartDate(newDebtStartDate: Date): void {
    this.debtStartDate = newDebtStartDate;
  }
}