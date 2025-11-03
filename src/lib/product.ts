export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  cost_price: number;
  sell_price: number;
  created_at: string;
  active: boolean;
  expiration_date: string | null;
}
