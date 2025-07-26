"use client";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { useStockStore } from "@/lib/store";
import { Star } from "lucide-react";

export default function WatchList() {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useStockStore();

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
  return <Card>WatchList</Card>;
}
