import StocksList from "@/components/stocks-list";
import WatchList from "@/components/watch-list";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <StocksList />
          </div>

          <div className="xl:col-span-1">
            <div className="sticky top-2">
              <WatchList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
