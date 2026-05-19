import { Response } from "express";
import { Entity } from "../models/Entity";

export const buyItem = async (req: any, res: Response) => {
  try {
    const { itemId } = req.body as { itemId: string };
    const user = req.user;

    // Find item in db
    const item = await Entity.findOne({ id: itemId });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if user has enough money to purchase item
    if (user.money < (item.price as number)) {
      return res.status(400).json({ message: "Insufficent funds " });
    }

    // Subtract price from amount
    user.money -= item.price as number;

    // Update inventory amount for user
    const currentCount = user.inventory[item.id] || 0;
    user.inventory[itemId] = currentCount + 1;

    // Save user
    await user.save();
    return res.status(201).json({});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
