import { ItemType } from "../../constants/itemConstants";
import BrownChair from "./BrownChair";
import GreenChair from "./GreenChair";
import PotPlant from "./PotPlant";
import Table from "./Table";

class ItemFactory {
  static createItem(type: ItemType) {
    switch (type) {
      case ItemType.BrownChair:
        return new BrownChair();
      case ItemType.GreenChair:
        return new GreenChair();
      case ItemType.Table:
        return new Table();
      case ItemType.PotPlant:
        return new PotPlant();
      default:
        throw new Error("Invalid item type");
    }
  }
}

export default ItemFactory;