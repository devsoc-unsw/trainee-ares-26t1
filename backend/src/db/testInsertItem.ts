import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./connect";
import { Entity } from "../models/Entity";
import ItemFactory from "../classes/item/ItemFactory";
import { ItemType } from "../constants/itemConstants";

dotenv.config();

const testInsertItem = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    const item1 = ItemFactory.createItem(ItemType.BrownChair);
    const item2 = ItemFactory.createItem(ItemType.GreenChair);
    const item3 = ItemFactory.createItem(ItemType.Table);
    const item4 = ItemFactory.createItem(ItemType.PotPlant);

    // insert items
    await Entity.insertMany([
      {
        id: item1.getId(),
        entityType: "Item",
        width: item1.getWidth(),
        height: item1.getHeight(),
        zIndex: item1.getZIndex(),
        itemType: item1.getType(),
        name: item1.getname(),
        price: item1.getPrice(),
      },
      {
        id: item2.getId(),
        entityType: "Item",
        width: item2.getWidth(),
        height: item2.getHeight(),
        zIndex: item2.getZIndex(),
        itemType: item2.getType(),
        name: item2.getname(),
        price: item2.getPrice(),
      },
      {
        id: item3.getId(),
        entityType: "Item",
        width: item3.getWidth(),
        height: item3.getHeight(),
        zIndex: item3.getZIndex(),
        itemType: item3.getType(),
        name: item3.getname(),
        price: item3.getPrice(),
      },
      {
        id: item4.getId(),  
        entityType: "Item",
        width: item4.getWidth(),
        height: item4.getHeight(),
        zIndex: item4.getZIndex(),
        itemType: item4.getType(),
        name: item4.getname(),
        price: item4.getPrice(),
      },
    ]);


    const items = await Entity.find({ entityType: "Item" });
    console.log(JSON.stringify(items, null, 2));

  } catch (err) {
    console.error("Error during test:");
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

testInsertItem();