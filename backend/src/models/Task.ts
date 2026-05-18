import { Schema } from "mongoose";

export interface ITask {
  id: string;
  name: string;
  type: 'Daily' | 'Weekly' | 'Custom';
  amount: number;

  difficulty?: 'Easy' | 'Medium' | 'Hard';
  dayOfWk?: number;
  deadline?: Date;
}

const TaskSchema = new Schema<ITask>({
  id: {
    type: String,
    required: true,
    immutable: true
  },

  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100
  },

  type: {
    type: String,
    required: true,
    enum: ['Daily', 'Weekly', 'Custom']
  },

  amount: {
    type: Number,
    required: true,
    min: 0
  },

  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
  },

  dayOfWk: {
    type: Number,
    min: 0,
    max: 6,
  },

  deadline: {
    type: Date,
  }

}, {
  _id: false
});

export default TaskSchema;