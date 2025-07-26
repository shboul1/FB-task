import { NextRequest, NextResponse } from "next/server";
import type { StockItem } from "@/types";
import Fuse from "fuse.js";
import { fuseConfig } from "@/lib/fues-config";

const MOCK_SEARCH_RESULTS: StockItem[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc. (Class A)",
  },
  {
    symbol: "GOOG",
    name: "Alphabet Inc. (Class C)",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
  },
  {
    symbol: "AVGO",
    name: "Broadcom Inc.",
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices, Inc.",
  },
  {
    symbol: "INTC",
    name: "Intel Corporation",
  },
  {
    symbol: "DIS",
    name: "The Walt Disney Company",
  },
  {
    symbol: "NFLX",
    name: "Netflix, Inc.",
  },
  {
    symbol: "V",
    name: "Visa Inc.",
  },
  {
    symbol: "MA",
    name: "Mastercard Incorporated",
  },
  {
    symbol: "PYPL",
    name: "PayPal Holdings, Inc.",
  },
  {
    symbol: "CSCO",
    name: "Cisco Systems, Inc.",
  },
  {
    symbol: "PEP",
    name: "PepsiCo, Inc.",
  },
  {
    symbol: "KO",
    name: "The Coca-Cola Company",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    let results = MOCK_SEARCH_RESULTS;
    if (q) {
      const fuse = new Fuse(MOCK_SEARCH_RESULTS, fuseConfig);
      const searchResults = fuse.search(q);
      results = searchResults.slice(0, 10).map((result) => result.item);
    }
    const randomizedResultNumbers = results.map((item) => ({
      ...item,
      price: Math.random() * 1000,
      change: Math.random() * 20 - 10,
      changePercent: Math.random() * 2 - 1,
      volume: Math.floor(Math.random() * 1000000),
    }));
    return NextResponse.json(randomizedResultNumbers);
  } catch (error) {
    console.error("Error in search stocks API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
