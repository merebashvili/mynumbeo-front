// Interface is used solely for type-checking purpose
export interface Product {
  _id: string;
  product: string;
  price_in_local: number;
  price_in_usd: number;
  quantity_for_month: number;
  country: string;
  owner: string;
  __v: number;
}
