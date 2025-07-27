import { NextRequest, NextResponse } from "next/server";
import { TimeRange, HistoricalPrice } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeRange = (searchParams.get("timeRange") as TimeRange) || "1M";
    const { symbol } = await params;
    const validTimeRanges: TimeRange[] = ["1D", "1W", "1M", "6M", "1Y"];
    if (!validTimeRanges.includes(timeRange)) {
      return NextResponse.json(
        { error: "Invalid time range" },
        { status: 400 }
      );
    }

    const historicalData = generateMockHistoricalData(symbol, timeRange);

    return NextResponse.json({
      symbol,
      timeRange,
      data: historicalData,
    });
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return NextResponse.json(
      { error: "Failed to fetch historical data" },
      { status: 500 }
    );
  }
}

function generateMockHistoricalData(
  symbol: string,
  timeRange: TimeRange
): HistoricalPrice[] {
  const now = new Date();
  const data: HistoricalPrice[] = [];

  let days: number;
  let interval: number;

  switch (timeRange) {
    case "1D":
      days = 1;
      interval = 1;
      break;
    case "1W":
      days = 7;
      interval = 1;
      break;
    case "1M":
      days = 30;
      interval = 1;
      break;
    case "6M":
      days = 180;
      interval = 7;
      break;
    case "1Y":
      days = 365;
      interval = 30;
      break;
    default:
      days = 30;
      interval = 1;
  }

  const basePrice = symbol.charCodeAt(0) * 10 + symbol.charCodeAt(1) * 5;

  for (let i = days; i >= 0; i -= interval) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const variation = (Math.random() - 0.5) * 0.1;
    const price = basePrice * (1 + variation);

    data.push({
      date: date.toISOString().split("T")[0],
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000 + 100000),
    });
  }

  return data;
}
