"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useStockStore } from "@/lib/store";
import { Star, X, TrendingUp, TrendingDown } from "lucide-react";

export default function WatchList() {
  const { watchlist, removeFromWatchlist } = useStockStore();

  if (watchlist.length === 0)
    return (
      <Card className="px-4">
        <CardContent>
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">
              Your Watchlist is Empty
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Search for stocks and add them to your watchlist to track their
              performance in real-time.
            </p>
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Watchlist ({watchlist.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {watchlist.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {stock.symbol}
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {stock.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="font-medium text-slate-900 dark:text-white">
                    ${stock.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-1">
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stock.change >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)} (
                      {stock.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFromWatchlist(stock.symbol)}
                className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
