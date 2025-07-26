export interface StockItem {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

export type TimeRange = "1D" | "1W" | "1M" | "6M" | "1Y";

export interface HistoricalPrice {
  date: string;
  price: number;
  volume?: number;
}

export interface StockDetails extends StockItem {
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  high52Week?: number;
  low52Week?: number;
}
