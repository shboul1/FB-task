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
import {
  formatChange,
  formatChangePercent,
  formatPrice,
  formatVolume,
} from "@/lib/utils";
import { Eye, Plus, Star } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStockStore } from "@/lib/store";
import Link from "next/link";
import SearchInput from "./search";
import { useEffect } from "react";
import { driverObj } from "@/lib/driver";

export default function StocksList({ stocks }: { stocks: StockItem[] }) {
  const { addToWatchlist, watchlist, removeFromWatchlist } = useStockStore();

  useEffect(() => {
    driverObj.drive();
  }, []);

  return (
    <Card className="p-6" id="table">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Stocks</h2>
          <SearchInput />
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
            {stocks?.map((stock, index) => {
              const isInWatchlist = watchlist.some(
                (item) => item.symbol === stock.symbol
              );
              return (
                <TableRow key={`${stock.symbol}-${index}`}>
                  <TableCell className="font-mono font-semibold">
                    <Link
                      href={`/stock/${stock.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {stock.symbol}
                    </Link>
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
                            onClick={() => removeFromWatchlist(stock.symbol)}
                          >
                            <Star className="text-yellow-500" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => addToWatchlist(stock)}
                            id="add-to-watchlist-btn"
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
                        <Link href={`/stock/${stock.id}`}>
                          <Button
                            size="icon"
                            variant="outline"
                            id="stock-details-btn"
                          >
                            <Eye />
                          </Button>
                        </Link>
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

export const StocksTableSkeleton = () => {
  return (
    <Card className="p-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Stocks</h2>
          <SearchInput />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {new Array(6).fill(null).map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-4 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {new Array(5).fill(null).map((_, index) => (
              <TableRow key={index}>
                {new Array(6).fill(null).map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
