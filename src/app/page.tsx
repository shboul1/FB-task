import { Suspense } from "react";
import {
  MarketOverview,
  MarketOverviewSkeleton,
} from "@/components/market-overview";
import { MarketIndex } from "@/types";

const MarketOverviewRenderer = async () => {
  const resp = await fetch("http://localhost:3000/api/market/overview");
  const data = (await resp.json()) as MarketIndex[];
  return <MarketOverview data={data} />;
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <Suspense fallback={<MarketOverviewSkeleton />}>
              <MarketOverviewRenderer />
            </Suspense>

            {/* Stock Detail Panel */}
            {/* <StockDetailPanel /> */}
          </div>

          {/* Sidebar - Watchlist */}
          <div className="xl:col-span-1">
            <div className="sticky top-24">hi</div>
          </div>
        </div>
      </div>
    </div>
  );
}
