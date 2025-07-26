import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import { fuseConfig } from "@/lib/fues-config";
import { stocksData } from "@/data/stocks";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    let results = stocksData;
    if (q) {
      const fuse = new Fuse(stocksData, fuseConfig);
      const searchResults = fuse.search(q);
      results = searchResults.slice(0, 10).map((result) => result.item);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in search stocks API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
