import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import process from "process";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into db
    const user = await User.create({
      email: email,
      password: hashedPassword,
      money: 100,
      sprite: "orange",
    
      layer0: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
    
      layer1: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
    
      layer2: Array.from({ length: 10 }, () =>
        Array.from({ length: 10 }, () => null)
      ),
    
      inventory: [],
      tasks: [],
      debtStartDate: null
    });

    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};