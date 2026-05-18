import { Schema } from "mongoose";

export interface IEntity {
  id: string;
  width: number;
  height: number;
  zIndex: number;
  entityType: 'Item' | 'Cat'; 

  // Item fields
  itemType?: string;
  name?: string;
  price?: number;

  // Cat fields
  catType?: string;
}

const EntitySchema = new Schema<IEntity>({
  id: {
    type: String,
    required: true,
    immutable: true
  },

  width: {
    type: Number,
    required: true,
    min: 1
  },

  height: {
    type: Number,
    required: true,
    min: 1
  },

  zIndex: {
    type: Number,
    required: true,
    min: 0,
    max: 2
  },

  entityType: {
    type: String,
    required: true,
    enum: ['Item', 'Cat']
  },

  /* =========================
     ITEM ONLY
  ========================= */

  itemType: {
    type: String,
  },

  name: {
    type: String,
  },

  price: {
    type: Number,
  },

  /* =========================
     CAT ONLY
  ========================= */

  catType: {
    type: String,
  }

}, {
  _id: false
});

export default EntitySchema;