import React, { useEffect, useState } from "react";
import { Search, X, TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import debounce from "lodash.debounce";
import { StockItem } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export default function SearchInput() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [open, setOpen] = useState(false);

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
      return response.json() as Promise<StockItem[]>;
    },
    enabled: debouncedQ.length > 0, // Only fetch when there's a search query
  });

  const handleSelect = (stock: StockItem) => {
    window.location.href = `/stock/${stock.id}`;
    setOpen(false);
  };

  return (
    <>
      <div className="relative w-64">
        <div className="relative" id="search-input">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8 w-64 rounded-full"
            placeholder="Search..."
            onFocus={() => setOpen(true)}
          />
        </div>
      </div>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Stocks"
        description="Search for stocks by symbol or company name"
      >
        <CommandInput
          placeholder="Search stocks..."
          value={q}
          onValueChange={setQ}
        />
        <CommandList className="max-h-[400px]">
          {!debouncedQ ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Start typing to search for stocks...
            </div>
          ) : isPending ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">
                Searching stocks...
              </span>
            </div>
          ) : error ? (
            <div className="p-4 text-center text-sm text-red-500">
              Error loading stocks
            </div>
          ) : stocks && stocks.length > 0 ? (
            <CommandGroup heading="Stocks">
              {stocks.map((stock) => (
                <CommandItem
                  key={stock.id}
                  onSelect={() => handleSelect(stock)}
                  className="flex items-center justify-between p-2 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">
                        {stock.symbol}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {stock.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      ${stock.price.toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-1">
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-red-500" />
                      )}
                      <span
                        className={cn(
                          "text-xs font-medium",
                          stock.change >= 0 ? "text-green-500" : "text-red-500"
                        )}
                      >
                        {stock.change >= 0 ? "+" : ""}
                        {stock.change.toFixed(2)} (
                        {stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : (
            <CommandEmpty>
              No stocks found for &quot;{debouncedQ}&quot;.
            </CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
