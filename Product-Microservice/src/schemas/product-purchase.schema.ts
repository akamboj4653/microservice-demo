import { Schema } from 'mongoose';

export const PurchaseProductSchema = new Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    trim: true,
  },
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative'],
  },
  purchaseDate: {
    type: Date,
    required: [true, 'Purchase date is required'],
    default: Date.now,
  },
},
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    toObject: {
      versionKey: false,
      transform: (_doc, ret: { [key: string]: any }) => {
        ret.id = ret._id; // Map _id to id
        delete ret._id;    // Remove _id
      },
    },
    toJSON: {
      versionKey: false,
      transform: (_doc, ret: { [key: string]: any }) => {
        ret.id = ret._id; // Map _id to id
        delete ret._id;    // Remove _id
      },
    },
  });
