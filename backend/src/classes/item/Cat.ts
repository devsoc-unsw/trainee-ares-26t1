import { CatType } from "../../constants/userContants";

class Cat extends Entity {
  private type: CatType;

  constructor(type: CatType, width: number, height: number, zIndex: number) {
    super(width, height, zIndex);
    this.type = type;
  }

  getType(): CatType {
    return this.type;
  }
}

export default Cat;