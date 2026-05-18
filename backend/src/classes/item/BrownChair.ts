import { BROWN_CHAIR_NAME, BROWN_CHAIR_PRICE, ItemType } from "../../constants/itemConstants";
import Item from "./Item";

class BrownChair extends Item {
  constructor() {
    super(ItemType.BrownChair, BROWN_CHAIR_NAME, BROWN_CHAIR_PRICE, 1, 1, 0);
  }
}

export default BrownChair;