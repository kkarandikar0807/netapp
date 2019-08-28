export interface Stock {
  symbol: string;
  company: string;
  price: number;
}

export interface StockSnapshot {
  date: string;
  price: number;
}

export interface Authentication {
  isAuthenticated: boolean;
}

export interface InverstorStockQuantity {
  symbol: string;
  quantity: number;
}

export interface InverstorStock {
  name: string;
  capital: number;
  stocks: InverstorStockQuantity[];
  totalStocks: number;
  totalValue: number;
}
