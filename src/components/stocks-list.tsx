"use client";

import { Card, CardContent, CardHeader } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import type { StockItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  formatChange,
  formatChangePercent,
  formatPrice,
  formatVolume,
} from "@/lib/utils";
import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { Input } from "./ui/input";
import { Eye, Plus, Search, Star, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import debounce from "lodash.debounce";
import { useStockStore } from "@/lib/store";

type StockItemWithDetails = StockItem & {
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

export default function StocksList() {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [debouncedQ, setDebouncedQ] = useState(q);
  const { addToWatchlist, watchlist, removeFromWatchlist } = useStockStore();

  useEffect(() => {
    const handler = debounce((value: string) => {
      setDebouncedQ(value);
    }, 300);
    handler(q);
    return () => {
      handler.cancel();
    };
  }, [q]);

  const {
    data: stocks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["stocks", { debouncedQ }],
    queryFn: async () => {
      const url = debouncedQ
        ? `/api/stocks?q=${encodeURIComponent(debouncedQ)}`
        : "/api/stocks";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch stocks data");
      }
      return response.json() as Promise<StockItemWithDetails[]>;
    },
  });

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-600">
          <p>Error loading stocks: {error.message}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Stocks</h2>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-8 w-64 rounded-full"
              value={q}
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
            />
            <X
              className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
              onClick={() => setQ("")}
              style={{ display: q ? "block" : "none" }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Symbol</TableHead>
              <TableHead className="font-semibold">Company Name</TableHead>
              <TableHead className="font-semibold text-right">Price</TableHead>
              <TableHead className="font-semibold text-right">Change</TableHead>
              <TableHead className="font-semibold text-right">
                Change %
              </TableHead>
              <TableHead className="font-semibold text-right">Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending
              ? new Array(5).fill(null).map((_, index) => (
                  <TableRow key={index}>
                    {new Array(6).fill(null).map((_, cellIndex) => (
                      <TableCell key={cellIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                    <TableCell className="flex items-center gap-2 justify-end">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <Skeleton className="h-9 w-9 rounded-full" />
                    </TableCell>
                  </TableRow>
                ))
              : stocks?.map((stock, index) => {
                  const isInWatchlist = watchlist.some(
                    (item) => item.symbol === stock.symbol
                  );
                  return (
                    <TableRow key={`${stock.symbol}-${index}`}>
                      <TableCell className="font-mono font-semibold">
                        {stock.symbol}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {stock.name}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatPrice(stock.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatChange(stock.change)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            stock.changePercent >= 0 ? "default" : "destructive"
                          }
                          className={`${
                            stock.changePercent >= 0
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }`}
                        >
                          {formatChangePercent(stock.changePercent)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-gray-600 font-mono">
                        {formatVolume(stock.volume)}
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {isInWatchlist ? (
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() =>
                                  removeFromWatchlist(stock.symbol)
                                }
                              >
                                <Star className="text-yellow-500" />
                              </Button>
                            ) : (
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => addToWatchlist(stock)}
                              >
                                <Plus />
                              </Button>
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to watchlist</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="outline">
                              <Eye />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
