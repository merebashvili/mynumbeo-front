import { Product } from './product';

// Interface is used solely for type-checking purpose
export interface Country {
  _id: string;
  name: string;
  products: Array<Product>;
  owner: string;
  __v: number;
}
