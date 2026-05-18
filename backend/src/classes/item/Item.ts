import { ItemType } from "../../constants/itemConstants";

class Item extends Entity {
  type: ItemType;
  name: string;
  price: number;
 
  constructor(
    type: ItemType,
    name: string,
    price: number,
    width: number,
    height: number,
    zIndex: number,
  ) {
    super(width, height, zIndex);
    this.type = type;
    this.name = name;
    this.price = price;
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
