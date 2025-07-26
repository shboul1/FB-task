import { StockQuote } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StockStore {
  watchlist: StockQuote[];
  addToWatchlist: (stock: StockQuote) => void;
  removeFromWatchlist: (symbol: string) => void;
}

export const useStockStore = create<StockStore>()(
  persist(
    (set, get) => ({
      watchlist: [],

      addToWatchlist: (stock) => {
        const { watchlist } = get();
        if (!watchlist.find((s) => s.symbol === stock.symbol)) {
          set({ watchlist: [...watchlist, stock] });
        }
      },

      removeFromWatchlist: (symbol) => {
        const { watchlist } = get();
        set({
          watchlist: watchlist.filter((stock) => stock.symbol !== symbol),
        });
      },
    }),
    {
      name: "stock-watchlist",
      partialize: (state) => ({ watchlist: state.watchlist }),
    }
  )
);
