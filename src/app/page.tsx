import StocksList, { StocksTableSkeleton } from "@/components/stocks-list";
import WatchList from "@/components/watch-list";
import { StockItem } from "@/types";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
const StocksListBase = async () => {
  const baseUrl = process.env.VERCEL_URL
    ? `https://fb-task-eight.vercel.app`
    : "http://localhost:3000";
  const stocksResp = await fetch(`${baseUrl}/api/stocks`);
  const stocks: StockItem[] = await stocksResp.json();
  return <StocksList stocks={stocks} />;
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <Suspense fallback={<StocksTableSkeleton />}>
              <StocksListBase />
            </Suspense>
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-2" id="watchlist">
              <WatchList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
