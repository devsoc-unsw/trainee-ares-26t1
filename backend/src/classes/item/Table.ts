import { ItemType, TABLE_NAME, TABLE_PRICE } from "../../constants/itemConstants";
import Item from "./Item";

class Table extends Item {
  constructor() {
    super(ItemType.Table, TABLE_NAME, TABLE_PRICE, 2, 2, 2);
  }
}

export default Table;