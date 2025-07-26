import { NextRequest, NextResponse } from "next/server";
import type { HistoricalData, StockQuote } from "@/types";

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
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("range") || "1M";

    if (!symbol) {
      return NextResponse.json(
        { error: "Stock symbol is required" },
        { status: 400 }
      );
    }

    const baseQuote = MOCK_QUOTES[symbol.toUpperCase()];
    if (!baseQuote) {
      return NextResponse.json(
        { error: `Historical data for ${symbol} not found` },
        { status: 404 }
      );
    }

    const DAYS_BY_TIME_RANGE_MAP = {
      "1D": 1,
      "1W": 7,
      "1M": 30,
      "6M": 180,
      "1Y": 365,
    };

    const days =
      DAYS_BY_TIME_RANGE_MAP[
        timeRange as keyof typeof DAYS_BY_TIME_RANGE_MAP
      ] || 30;

    const data: HistoricalData[] = [];

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      // Generate realistic price variations
      const variation = (Math.random() - 0.5) * 0.1;
      const basePrice = baseQuote.price * (1 + variation);
      const dayVariation = Math.random() * 0.02;

      const open = basePrice * (1 + (Math.random() - 0.5) * dayVariation);
      const close = basePrice * (1 + (Math.random() - 0.5) * dayVariation);
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      const volume = Math.floor(baseQuote.volume * (0.5 + Math.random()));

      data.push({
        date: date.toISOString(),
        open: Math.max(0.01, open),
        high: Math.max(0.01, high),
        low: Math.max(0.01, low),
        close: Math.max(0.01, close),
        volume,
      });
    }

    const historicalData = data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return NextResponse.json(historicalData);
  } catch (error) {
    console.error("Error in historical data API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
