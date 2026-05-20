import { Response } from "express";
import { CatType, DEFAULT_USER_STATE } from "../constants/userContants";
import { checkLayers } from "./helpers/itemHelper";

// Returns user data
export const getUser = async (req: any, res: Response) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req: any, res: Response) => {
  try {
    const user = req.user;
    const { layers, inventory, money, sprite, tasks, debtStartDate } = req.body;

    if (layers) {
      if (!checkLayers(layers)) {
        return res.status(400).json({ message: "Invalid layers provided" });
      }
      user.layers = layers;
    }
    if (inventory !== undefined) user.inventory = inventory;
    if (money !== undefined) user.money = money;
    if (sprite !== undefined) user.sprite = sprite;
    if (tasks !== undefined) user.tasks = tasks;
    if (debtStartDate !== undefined) user.debtStartDate = debtStartDate;

    await user.save();
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Resets user to default state
export const resetUser = async (req: any, res: Response) => {
  try {
    const user = req.user;

    // reset fields
    user.money = DEFAULT_USER_STATE.money;
    user.layers = DEFAULT_USER_STATE.layers;
    user.inventory = DEFAULT_USER_STATE.inventory;
    user.tasks = DEFAULT_USER_STATE.tasks;
    user.debtStartDate = DEFAULT_USER_STATE.debtStartDate;

    await user.save();

    return res.status(201).json({});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCatType = async (req: any, res: Response) => {
  try {
    const { sprite: newCat } = req.body as { sprite: CatType };
    const user = req.user;

    user["sprite"] = newCat;
    await user.save();
    return res.status(201).json({});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateMap = async (req: any, res: Response) => {
  try {
    const { layers: newLayers } = req.body;
    const user = req.user;

    // Check newLayers provided are valid
    if (!checkLayers(newLayers)) {
      return res.status(400).json({ message: "Invalid layers provided" });
    }

    // Update layers for user in db
    user.layers = newLayers;
    user.save();
    return res.status(201).json({});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
