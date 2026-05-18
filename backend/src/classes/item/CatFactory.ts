import { CatType } from "../../constants/userContants";
import BlackCat from "./BlackCat";
import OrangeCat from "./OrangeCat";
import WhiteCat from "./WhiteCat";

class CatFactory {
  static createCat(type: CatType) {
    switch (type) {
      case CatType.Black:
        return new BlackCat();
      case CatType.White:
        return new WhiteCat();
      case CatType.Orange:
        return new OrangeCat();
      default:
        throw new Error("Invalid cat type");
    }
  }
}

export default CatFactory;