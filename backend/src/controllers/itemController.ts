import { Response } from "express";
import { Entity } from "../models/Entity";
import { ItemModel } from "../models/Item";

export const buyItem = async (req: any, res: Response) => {
  try {
    const { id: itemId } = req.body as { id: number };
    const user = req.user;

    // Find item in db
    console.log(itemId);
    const item = await ItemModel.findOne({ id: itemId });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if user has enough money to purchase item
    if (user.money < (item.price as number)) {
      return res.status(400).json({ message: "Insufficent funds" });
    }

    // Subtract price from amount
    user.money -= item.price as number;

    // Update inventory amount for user
    const existingItem = user.inventory.find(
      (inv: any) => inv.tileId === itemId
    );

    if (existingItem) {
      existingItem.count += 1;
    } else {
      user.inventory.push({
        tileId: itemId,
        count: 1,
      });
    }

    // Save user
    await user.save();
    return res.status(201).json({ inventory: user.inventory, money: user.money });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
