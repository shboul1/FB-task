import { driver } from "driver.js";

export const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: "#table",
      popover: {
        title: "📊 Stocks Table",
        description:
          "Streaming + SSR. Just showcasing Next.js SSR/Rendering capabilities - ideally, fetching should be on the client side if we need more dynamic data.",
      },
    },
    {
      element: "#search-input",
      popover: {
        title: "🔍 Search",
        description:
          "Fuzzy + debounced API search. If filtering the list below, I'd store input in query params for better state control.",
      },
    },
    {
      element: "#watchlist",
      popover: {
        title: "📁 Watchlist",
        description: "All your saved stocks appear here.",
      },
    },
    {
      element: "#stock-details-btn",
      popover: {
        title: "📈 Details",
        description: "Click to open the stock’s detailed page.",
      },
    },
    {
      element: "#add-to-watchlist-btn",
      popover: {
        title: "⭐ Add Stock",
        description: "Tap here to add to your watchlist.",
      },
    },
    {
      element: "#github-link",
      popover: {
        title: "GitHub",
        description: "View the source code on GitHub.",
      },
    },
  ],
});
