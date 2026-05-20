import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./connect";
import { ItemModel } from "../models/Item";

dotenv.config();

const ITEMS = [
  {
    id: 1,
    name: "Chair",
    layer: 0,
    sprite: "/tiles/lv0/chair.png",
    price: 67,
  },
  {
    id: 2,
    name: "Rug (Left)",
    layer: 0,
    sprite: "/tiles/lv0/rug_left.png",
    price: 20,
  },
  {
    id: 3,
    name: "Rug (Right)",
    layer: 0,
    sprite: "/tiles/lv0/rug_right.png",
    price: 20,
  },
  {
    id: 4,
    name: "Stool",
    layer: 0,
    sprite: "/tiles/lv0/stool.png",
    price: 40,
  },

  // Layer 1
  {
    id: 10,
    name: "Potted Plant",
    layer: 1,
    sprite: "/tiles/lv1/plant.png",
    price: 40,
  },
  {
    id: 11,
    name: "Counter (Left)",
    layer: 1,
    sprite: "/tiles/lv1/counter_left.png",
    price: 30,
  },
  {
    id: 12,
    name: "Counter (Middle)",
    layer: 1,
    sprite: "/tiles/lv1/counter_middle.png",
    price: 30,
  },
  {
    id: 13,
    name: "Counter (Right)",
    layer: 1,
    sprite: "/tiles/lv1/counter_right.png",
    price: 30,
  },
  {
    id: 14,
    name: "Table (Top Left)",
    layer: 1,
    sprite: "/tiles/lv1/table_tl.png",
    price: 40,
  },
  {
    id: 15,
    name: "Table (Top Right)",
    layer: 1,
    sprite: "/tiles/lv1/table_tr.png",
    price: 40,
  },
  {
    id: 16,
    name: "Table (Bottom Left)",
    layer: 1,
    sprite: "/tiles/lv1/table_bl.png",
    price: 40,
  },
  {
    id: 17,
    name: "Table (Bottom Right)",
    layer: 1,
    sprite: "/tiles/lv1/table_br.png",
    price: 40,
  },

  // Layer 2
  {
    id: 20,
    name: "Cake",
    layer: 2,
    sprite: "/tiles/lv2/cake.png",
    price: 10,
  },
  {
    id: 21,
    name: "Coffee Machine",
    layer: 2,
    sprite: "/tiles/lv2/coffee_machine.png",
    price: 50,
  },
  {
    id: 22,
    name: "Coffee",
    layer: 2,
    sprite: "/tiles/lv2/coffee.png",
    price: 5,
  },
  {
    id: 23,
    name: "Croissant",
    layer: 2,
    sprite: "/tiles/lv2/croissant.png",
    price: 8,
  },
  {
    id: 24,
    name: "Pie",
    layer: 2,
    sprite: "/tiles/lv2/pie.png",
    price: 10,
  },
];

const testInsertItem = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    // insert items
    for (const item of ITEMS) {
      await ItemModel.updateOne(
        { id: item.id }, // match by id
        { $set: item },  // overwrite/update
        { upsert: true } // insert if not exists
      );
    }

  } catch (err) {
    console.error("Error during test:");
    console.error(err);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

testInsertItem();