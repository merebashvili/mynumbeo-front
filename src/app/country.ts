import { Product } from './product';

// Interface is used solely for type-checking purpose
export interface ResponseCountry {
  _id: string;
  name: string;
  products: Array<Product>;
  owner: string;
  __v: number;
}

export interface Country {
  _id: string;
  name: string;
  quantity_of_products: number;
  totalExpenseInGlobalCurrency: number;
}
