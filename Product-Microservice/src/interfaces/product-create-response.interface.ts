import { IProduct } from "./product-interface.interface";
import { IPurchaseProduct } from "./product-purchase.interface";

export interface IProductResponse {
  status: number;
  message: string;
  product: IPurchaseProduct | IProduct | null;
  errors: { [key: string]: any } | null;
}
