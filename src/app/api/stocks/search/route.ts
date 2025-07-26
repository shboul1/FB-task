import { NextRequest, NextResponse } from "next/server";
import type { StockSearchResult } from "@/types";

const MOCK_SEARCH_RESULTS: StockSearchResult[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    type: "Equity",
    region: "United States",
    marketOpen: "09:30",
    marketClose: "16:00",
    timezone: "UTC-04",
    currency: "USD",
    matchScore: "1.0000",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    type: "Equity",
    region: "United States",
    marketOpen: "09:30",
    marketClose: "16:00",
    timezone: "UTC-04",
    currency: "USD",
    matchScore: "0.9000",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    type: "Equity",
    region: "United States",
    marketOpen: "09:30",
    marketClose: "16:00",
    timezone: "UTC-04",
    currency: "USD",
    matchScore: "0.8000",
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    const filtered = MOCK_SEARCH_RESULTS.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
    );

    if (
      query.toLowerCase().includes("tesla") ||
      query.toLowerCase().includes("tsla")
    ) {
      filtered.push({
        symbol: "TSLA",
        name: "Tesla, Inc.",
        type: "Equity",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "1.0000",
      });
    }

    if (
      query.toLowerCase().includes("nvidia") ||
      query.toLowerCase().includes("nvda")
    ) {
      filtered.push({
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        type: "Equity",
        region: "United States",
        marketOpen: "09:30",
        marketClose: "16:00",
        timezone: "UTC-04",
        currency: "USD",
        matchScore: "1.0000",
      });
    }

    const results = filtered.slice(0, 10); // Limit results

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in search stocks API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
