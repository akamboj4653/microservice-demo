import * as mongoose from 'mongoose';
import { IProduct } from 'src/interfaces/product-interface.interface';


export const ProductSchema = new mongoose.Schema<IProduct>(
  {
    productName: {
      type: String,
      required: [true, 'Product name cannot be empty'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price cannot be empty'],
      min: [0, 'Price cannot be negative'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity cannot be empty'],
      min: [0, 'Quantity cannot be negative'],
    },
    company: {
      type: String,
      required: [true, 'Company name cannot be empty'],
      trim: true,
    },
    dateOfManufacture: {
      type: Date,
      required: [true, 'Date of manufacture cannot be empty'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Groceries', 'Furniture', 'Books'],
      required: [true, 'Category cannot be empty'],
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
  },
);

export const ProductModel = mongoose.model<IProduct>(
  'Product',
  ProductSchema,
);
