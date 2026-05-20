import { ItemType } from "../../constants/itemConstants";
import Entity from "./Entity";

class Item extends Entity {
  private id: string;
  private type: ItemType;
  private name: string;
  private price: number;
 
  constructor(
    type: ItemType,
    name: string,
    price: number,
    width: number,
    height: number,
    zIndex: number,
  ) {
    super(width, height, zIndex);
    this.id = crypto.randomUUID();
    this.type = type;
    this.name = name;
    this.price = price;
  }

  getId(): string {
    return this.id;
  }

  getType(): ItemType {
    return this.type;
  }

  getname(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}

export default Item;
