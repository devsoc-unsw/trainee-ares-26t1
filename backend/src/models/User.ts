import mongoose, { Schema } from "mongoose";
import { IEntity } from "./Entity";
import TaskSchema, { ITask } from "./Task";

// const userSchema = new mongoose.Schema(
//   {
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     name: String,

//     // can add other fields later...
//     // avatar: String,
//   },
//   { timestamps: true }
// );

export interface IUser extends Document {
  email: string;

  password: string;

  money: number;

  sprite: string;

  layer0: (IEntity | null)[][];
  layer1: (IEntity | null)[][];
  layer2: (IEntity | null)[][];

  inventory: Map<string, number>;

  tasks: ITask[];

  debtStartDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,

    match: [
      /^\S+@\S+\.\S+$/,
      'Invalid email format'
    ]
  },

  password: {
    type: String,
    required: true,
    minlength: 64
  },

  money: {
    type: Number,
    required: true,
    default: 0
  },

  sprite: {
    type: String,
    required: true
  },

  /* =========================
     GAME BOARD LAYERS
  ========================= */

  layer0: {
    type: [[Schema.Types.Mixed]],
    required: true,

    validate: {
      validator: function (board: IEntity[][]) {
        return board.length === 10;
      },
      message: 'layer0 must contain 10 rows'
    }
  },

  layer1: {
    type: [[Schema.Types.Mixed]],
    required: true,

    validate: {
      validator: function (board: IEntity[][]) {
        return board.length === 10;
      },
      message: 'layer1 must contain 10 rows'
    }
  },

  layer2: {
    type: [[Schema.Types.Mixed]],
    required: true,

    validate: {
      validator: function (board: IEntity[][]) {
        return board.length === 10;
      },
      message: 'layer2 must contain 10 rows'
    }
  },

  /* =========================
     INVENTORY
  ========================= */

  inventory: {
    type: Map,

    of: {
      type: Number,
      min: 0
    },

    default: {}
  },

  /* =========================
     TASKS
  ========================= */

  tasks: {
    type: [TaskSchema],
    required: true,
    default: []
  },

  /* =========================
     DEBT
  ========================= */

  debtStartDate: {
    type: Date,
    default: null
  }

}, {
  timestamps: true
});

export const User = mongoose.model("User", UserSchema);