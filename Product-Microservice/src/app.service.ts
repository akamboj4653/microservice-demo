import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from './interfaces/product-interface.interface';
import { IPurchaseProduct } from './interfaces/product-purchase.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<IProduct>,
    @InjectModel('ProductPurchase') private readonly productPurchaseModel: Model<IPurchaseProduct>,
  ) {}

  /**
   * Creates a new product in the database.
   * @param product - The product details to be created.
   * @returns The created product document.
   */
  public async createProduct(product: IProduct): Promise<IProduct> {
    try {
      // Create a new product instance
      const createProduct = new this.productModel(product);
      // Save the product to the database
      return await createProduct.save();
    } catch (error) {
      // Log the error and throw it for further handling
      console.error('Error in createProduct:', error);
      throw new Error('Failed to create product. Please try again.');
    }
  }

  /**
   * Processes the purchase of a product and records it in the database.
   * @param product - The purchase details including product and user information.
   * @returns The recorded purchase document.
   */
  public async purchaseProduct(product: IPurchaseProduct): Promise<IPurchaseProduct> {
    try {
      // Create a new product purchase instance
      const purchaseProduct = new this.productPurchaseModel(product);
      // Save the purchase record to the database
      return await purchaseProduct.save();
    } catch (error) {
      // Log the error and throw it for further handling
      console.error('Error in purchaseProduct:', error);
      throw new Error('Failed to process product purchase. Please try again.');
    }
  }
}
