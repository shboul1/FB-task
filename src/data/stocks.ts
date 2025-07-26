import { StockItem } from "@/types";
const STOCKS_NAMES = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
  },
  {
    name: "Microsoft Corporation",
    symbol: "MSFT",
  },
  {
    name: "Alphabet Inc.",
    symbol: "GOOGL",
  },
  {
    name: "Amazon.com, Inc.",
    symbol: "AMZN",
  },
  {
    name: "Tesla, Inc.",
    symbol: "TSLA",
  },
  {
    name: "Meta Platforms, Inc.",
    symbol: "META",
  },
  {
    name: "NVIDIA Corporation",
    symbol: "NVDA",
  },
  {
    name: "Berkshire Hathaway Inc.",
    symbol: "BRK.A",
  },
  {
    name: "Visa Inc.",
    symbol: "V",
  },
  {
    name: "Johnson & Johnson",
    symbol: "JNJ",
  },
  {
    name: "Walmart Inc.",
    symbol: "WMT",
  },
  {
    name: "Procter & Gamble Co.",
    symbol: "PG",
  },
  {
    name: "UnitedHealth Group Incorporated",
    symbol: "UNH",
  },
  {
    name: "JPMorgan Chase & Co.",
    symbol: "JPM",
  },
  {
    name: "Exxon Mobil Corporation",
    symbol: "XOM",
  },
  {
    name: "Pfizer Inc.",
    symbol: "PFE",
  },
  {
    name: "Coca-Cola Company",
    symbol: "KO",
  },
  {
    name: "Walt Disney Company",
    symbol: "DIS",
  },
  {
    name: "Intel Corporation",
    symbol: "INTC",
  },
  {
    name: "PepsiCo, Inc.",
    symbol: "PEP",
  },
  {
    name: "Verizon Communications Inc.",
    symbol: "VZ",
  },
  {
    name: "AT&T Inc.",
    symbol: "T",
  },
];
export const stocksData: StockItem[] = STOCKS_NAMES.map((stock, index) => ({
  id: index + 1,
  symbol: stock.symbol,
  name: stock.name,
  price: parseFloat((Math.random() * 100 + 1).toFixed(2)),
  change: parseFloat((Math.random() * 10 - 5).toFixed(2)),
  changePercent: parseFloat((Math.random() * 10 - 5).toFixed(2)),
  volume: Math.floor(Math.random() * 1000000 + 1000),
}));
