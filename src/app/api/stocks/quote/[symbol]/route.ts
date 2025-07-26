import { NextRequest, NextResponse } from "next/server";
import type { StockQuote } from "@/types";

const MOCK_QUOTES: Record<string, StockQuote> = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45678900,
    open: 173.28,
    high: 176.12,
    low: 172.95,
    previousClose: 173.28,
    lastUpdated: new Date().toISOString(),
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.87,
    change: -1.23,
    changePercent: -0.85,
    volume: 23456789,
    open: 144.1,
    high: 144.85,
    low: 142.15,
    previousClose: 144.1,
    lastUpdated: new Date().toISOString(),
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.92,
    change: 4.67,
    changePercent: 1.25,
    volume: 34567890,
    open: 374.25,
    high: 379.45,
    low: 373.8,
    previousClose: 374.25,
    lastUpdated: new Date().toISOString(),
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.73,
    change: -3.45,
    changePercent: -1.37,
    volume: 67890123,
    open: 252.18,
    high: 253.95,
    low: 247.2,
    previousClose: 252.18,
    lastUpdated: new Date().toISOString(),
  },
  NVDA: {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 875.28,
    change: 12.45,
    changePercent: 1.44,
    volume: 45123678,
    open: 862.83,
    high: 878.9,
    low: 860.15,
    previousClose: 862.83,
    lastUpdated: new Date().toISOString(),
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  try {
    const { symbol } = params;

    if (!symbol) {
      return NextResponse.json(
        { error: "Stock symbol is required" },
        { status: 400 }
      );
    }

    const baseQuote = MOCK_QUOTES[symbol.toUpperCase()];
    if (!baseQuote) {
      return NextResponse.json(
        { error: `Stock ${symbol} not found` },
        { status: 404 }
      );
    }

    const variation = (Math.random() - 0.5) * 2;
    const priceVariation = variation * 0.5;

    const quote = {
      ...baseQuote,
      price: Math.max(0.01, baseQuote.price + priceVariation),
      change: baseQuote.change + variation * 0.2,
      changePercent: baseQuote.changePercent + variation * 0.1,
      lastUpdated: new Date().toISOString(),
    };

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error in stock quote API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
