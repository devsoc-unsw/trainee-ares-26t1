import { CatType } from "../../constants/userContants";
import Cat from "./Cat";

class OrangeCat extends Cat {
  constructor() {
    super(CatType.Orange, 1, 1, 1);
  }
}

export default OrangeCat;