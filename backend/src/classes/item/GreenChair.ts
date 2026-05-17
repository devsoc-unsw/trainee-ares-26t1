import { GREEN_CHAIR_NAME, GREEN_CHAIR_PRICE, ItemType } from "../../constants/itemConstants";
import Item from "./Item";

class GreenChair extends Item {
  constructor() {
    super(ItemType.GreenChair, GREEN_CHAIR_NAME, GREEN_CHAIR_PRICE, 1, 1, 0);
  }
}

export default GreenChair;