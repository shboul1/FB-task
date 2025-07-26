"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimeRange } from "@/types";
import { stocksData } from "@/data/stocks";

export default function StockDetailsPage() {
  const params = useParams();
  const stockId = parseInt(params.id as string);
  const [timeRange, setTimeRange] = useState<TimeRange>("1M");

  const stock = stocksData.find((s) => s.id === stockId);

  const { data: historicalData, isLoading: isLoadingHistorical } = useQuery({
    queryKey: ["stock-historical", stock?.symbol, timeRange],
    queryFn: async () => {
      if (!stock) return null;
      const response = await fetch(
        `/api/stocks/${stock.symbol}/historical?timeRange=${timeRange}`
      );
      if (!response.ok) throw new Error("Failed to fetch historical data");
      return response.json();
    },
    enabled: !!stock,
    staleTime: 1000 * 60 * 5,
  });

  if (!stock) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Stock not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to stocks list
          </Link>
        </div>
      </div>
    );
  }

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: "1D", label: "1D" },
    { value: "1W", label: "1W" },
    { value: "1M", label: "1M" },
    { value: "6M", label: "6M" },
    { value: "1Y", label: "1Y" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stocks
          </Button>
        </Link>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{stock.name}</h1>
            <p className="text-xl text-gray-600">{stock.symbol}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${stock.price}
            </div>
            <div
              className={`flex items-center ${
                stock.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="font-medium">
                {stock.change >= 0 ? "+" : ""}
                {stock.change} ({stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Price Chart</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingHistorical ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-gray-500">Loading chart...</div>
                </div>
              ) : historicalData?.data ? (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={historicalData.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <YAxis
                      domain={["dataMin - 1", "dataMax + 1"]}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      labelFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                      }}
                      formatter={(value: number) => [`$${value}`, "Price"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-64 flex items-center justify-center">
                  <div className="text-gray-500">No data available</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price</span>
                <span className="font-medium">${stock.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Change</span>
                <span
                  className={`font-medium ${
                    stock.change >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change} ({stock.changePercent >= 0 ? "+" : ""}
                  {stock.changePercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Volume</span>
                <span className="font-medium">
                  {stock.volume.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Market Cap</span>
                <span className="font-medium">
                  ${(stock.price * stock.volume * 0.1).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">P/E Ratio</span>
                <span className="font-medium">
                  {(Math.random() * 30 + 10).toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52W High</span>
                <span className="font-medium">
                  ${(stock.price * 1.2).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">52W Low</span>
                <span className="font-medium">
                  ${(stock.price * 0.8).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
