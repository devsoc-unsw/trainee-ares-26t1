import { Response } from "express";

// Returns user data
export const getUser = async (req: any, res: Response) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
