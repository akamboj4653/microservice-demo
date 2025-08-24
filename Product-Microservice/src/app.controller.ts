import { Controller, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { IProductResponse } from './interfaces/product-create-response.interface';
import { IProduct } from './interfaces/product-interface.interface';
import { IPurchaseProduct } from './interfaces/product-purchase.interface';
import { RESPONSE_MESSAGE } from './common/constants/response-messages';

@Controller()
export class AppController {

  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    private readonly appService: AppService
  ) { }

  /**
   * Handles the creation of a product.
   * @param product - The product details to be created.
   * @returns The response containing the created product details.
   */
  @MessagePattern('product_create')
  public async createProduct(product: IProduct): Promise<IProductResponse> {
    try {
      console.log('Creating product:', product);
      // Call the service to create the product
      const productRes = await this.appService.createProduct(product);

      // Return success response
      return {
        status: 201,
        message: RESPONSE_MESSAGE.PRODUCT_CREATE_SUCCESS,
        product: productRes,
        errors: null,
      };
    } catch (error) {
      // Handle errors during product creation
      console.error('Error creating product:', error);
      return {
        status: 500,
        message: RESPONSE_MESSAGE.PRODUCT_CREATE_FAILED,
        product: null,
        errors: error.message,
      };
    }
  }

  /**
   * Handles the purchase of a product.
   * @param product - The product purchase details.
   * @returns The response containing the purchase result.
   */
  @MessagePattern('product_purchase')
  public async purchaseProduct(product: IPurchaseProduct): Promise<IProductResponse> {
    try {
      // Call the service to process the product purchase
      const purchaseResult = await this.appService.purchaseProduct(product);

      // Check if the purchase was successful
      if (!purchaseResult) {
        throw new Error('Purchase processing failed.');
      }

      // Prepare the payload for purchase history event
      const purchaseHistoryPayload = {
        purchase: {
          userId: product.userId,
          productId: product.productId,
          purchaseDate: product.purchaseDate,
          quantity: product.quantity,
          totalPrice: product.totalPrice,
        },
      };

      // Emit the purchase history event to the user service
      await this.userClient.emit('purchase_history', purchaseHistoryPayload);

      // Return success response
      return {
        status: 201,
        message: RESPONSE_MESSAGE.PRODUCT_PURCHASE_SUCCESS,
        product: purchaseResult,
        errors: null,
      };
    } catch (error) {
      // Handle errors during product purchase
      console.error('Error purchasing product:', error);
      return {
        status: 500,
        message: RESPONSE_MESSAGE.PRODUCT_PURCHASE_FAILED,
        product: null,
        errors: error.message,
      };
    }
  }
}
