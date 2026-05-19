import { ItemType, POTPLANT_NAME, POTPLANT_PRICE } from "../../constants/itemConstants";
import Item from "./Item";

class PotPlant extends Item {
  constructor() {
    super(ItemType.PotPlant, POTPLANT_NAME, POTPLANT_PRICE, 1, 1, 2);
  }
}

export default PotPlant;