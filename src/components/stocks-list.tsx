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
import { useMemo } from "react";
import { fuseConfig } from "@/lib/fues-config";
import { useQueryState } from "nuqs";
import Fuse from "fuse.js";
import { Input } from "./ui/input";
import { Eye, Plus, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type StockItemWithDetails = StockItem & {
  price: number;
  change: number;
  changePercent: number;
  volume: number;
};

export default function StocksList() {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const {
    data: stocks,
    isPending,
    error,
  } = useQuery({
    queryKey: ["stocks"],
    queryFn: async () => {
      const response = await fetch("/api/stocks");
      if (!response.ok) {
        throw new Error("Failed to fetch stocks data");
      }
      return response.json() as Promise<StockItemWithDetails[]>;
    },
    refetchInterval: 3000,
  });

  const filteredData = useMemo(() => {
    if (!stocks || stocks.length === 0) return [];
    if (!q) return stocks;
    const fuse = new Fuse(stocks, fuseConfig);
    const searchResults = fuse.search(q);
    const results = searchResults
      .slice(0, 10)
      .map((result) => ({
        ...result.item,
        score: result.score,
      }))
      .sort((a, b) => a.score! - b.score!);
    return results;
  }, [stocks, q]);

  if (isPending) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

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
            {filteredData.map((stock, index) => (
              <TableRow
                key={`${stock.symbol}-${index}`}
                className="hover:bg-transparent"
              >
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
                <TableCell className="text-right text-gray-600 font-mono space-x-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="icon" variant="outline">
                        <Plus />
                      </Button>
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
