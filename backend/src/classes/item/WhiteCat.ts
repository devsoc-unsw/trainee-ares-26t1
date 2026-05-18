import { CatType } from "../../constants/userContants";
import Cat from "./Cat";

class WhiteCat extends Cat {
  constructor() {
    super(CatType.White, 1, 1, 1);
  }
}

export default WhiteCat;