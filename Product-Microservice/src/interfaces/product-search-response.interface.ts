import { IProduct } from "./product-interface.interface";

export interface IProductSearchResponse {
  status: number;
  message: string;
  product: IProduct | null;
}
