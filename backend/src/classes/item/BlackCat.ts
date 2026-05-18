import { CatType } from "../../constants/userContants";
import Cat from "./Cat";

class BlackCat extends Cat {
  constructor() {
    super(CatType.Black, 1, 1, 1);
  }
}

export default BlackCat;