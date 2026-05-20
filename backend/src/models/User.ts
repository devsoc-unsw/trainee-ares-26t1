import mongoose, { Schema, Document } from "mongoose";

/* ---------------- TYPES ---------------- */

type Layer = (number | null)[][];

interface UserDoc extends Document {
  email: string;
  password: string;
  money: number;
  sprite: string;

  layers: {
    layer0: Layer;
    layer1: Layer;
    layer2: Layer;
  };

  inventory: {
    tileId: number;
    count: number;
  }[];

  tasks: {
    id: string;
    type: "Daily" | "Weekly" | "Custom";
    name: string;
    amount: number;
    difficulty?: string;
    dayOfWk?: number;
    deadline?: string;
  }[];

  debtStartDate: Date | null;
}

/* ---------------- SCHEMAS ---------------- */

// Inventory item
const InventorySchema = new Schema(
  {
    tileId: { type: Number, required: true },
    count: { type: Number, required: true },
  },
  { _id: false }
);

// Task
const TaskSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    difficulty: { type: String },
    dayOfWk: { type: Number },
    deadline: { type: String },
  },
  { _id: false }
);

// Helper: 10x10 grid generator
const createGrid = () =>
  Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => null)
  );

/* ---------------- USER SCHEMA ---------------- */

const UserSchema = new Schema<UserDoc>(
  {
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    money: { type: Number, default: 0 },

    sprite: { type: String, default: "orange" },

    /* ---------------- LAYERS ---------------- */
    layers: {
      layer0: {
        type: [[Schema.Types.Mixed]],
        default: createGrid,
      },
      layer1: {
        type: [[Schema.Types.Mixed]],
        default: createGrid,
      },
      layer2: {
        type: [[Schema.Types.Mixed]],
        default: createGrid,
      },
    },

    inventory: {
      type: [InventorySchema],
      default: [],
    },

    tasks: {
      type: [TaskSchema],
      default: [],
    },

    debtStartDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDoc>("User", UserSchema);