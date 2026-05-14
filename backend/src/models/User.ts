import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,

    // can add other fields later...
    // avatar: String,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);