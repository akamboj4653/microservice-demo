import { Document } from 'mongoose';

export interface IProductLink extends Document {
  id?: string;
  product_id: string;
  name: string;
  link: string;
  is_used: boolean;
}
