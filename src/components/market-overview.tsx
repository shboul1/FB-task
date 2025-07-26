import { MarketIndex } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

export const MarketOverview = ({ data }: { data: MarketIndex[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((index) => (
            <div
              key={index.symbol}
              className="text-center p-4 bg-slate-50 rounded-lg"
            >
              <h3 className="font-medium text-slate-900 mb-1">{index.name}</h3>
              <p className="text-2xl font-bold text-slate-900 mb-1">
                {index.price.toLocaleString()}
              </p>
              <div className="flex items-center justify-center">
                {index.change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span
                  className={`text-sm font-medium ${
                    index.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {index.change >= 0 ? "+" : ""}
                  {index.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const MarketOverviewSkeleton = () => {
  return <Skeleton className="h-96 w-full" />;
};
