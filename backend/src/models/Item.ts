import mongoose, { Schema, Document } from "mongoose";

export interface Item extends Document {
  id: number;
  name: string;
  layer: number;
  sprite: string;
  price: number;
}

const ItemSchema = new Schema<Item>({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  layer: { type: Number, required: true },
  sprite: { type: String, required: true },
  price: { type: Number, required: true },
});

export const ItemModel = mongoose.model<Item>("Item", ItemSchema);