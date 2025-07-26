import { NextResponse } from "next/server";
import type { MarketIndex } from "@/types";

const marketIndices: MarketIndex[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    price: 4567.89,
    change: 23.45,
    changePercent: 0.52,
  },
  {
    symbol: "DJI",
    name: "Dow Jones",
    price: 34567.12,
    change: -45.67,
    changePercent: -0.13,
  },
  {
    symbol: "IXIC",
    name: "NASDAQ",
    price: 14234.56,
    change: 67.89,
    changePercent: 0.48,
  },
];
export async function GET() {
  try {
    return NextResponse.json(marketIndices);
  } catch (error) {
    console.error("Error in market overview API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
