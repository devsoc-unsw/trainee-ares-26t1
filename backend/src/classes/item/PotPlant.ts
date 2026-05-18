import { ItemType, TABLE_NAME, TABLE_PRICE } from "../../constants/itemConstants";
import Item from "./Item";

class PotPlant extends Item {
  constructor() {
    super(ItemType.Table, TABLE_NAME, TABLE_PRICE, 1, 1, 2);
  }
}

export default PotPlant;