# 📈 Stock Market Dashboard

A modern, responsive stock market dashboard built with Next.js 15, featuring stock data visualization, watchlist management, and interactive charts. This project demonstrates advanced React patterns, state management, and modern web development practices.

## ✨ Features

### 🏠 Main Dashboard

- **Stocks Table**: Displays comprehensive stock information including symbol, company name, price, change, change percentage, and volume
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Server-Side Rendering**: Leverages Next.js 15's SSR capabilities for optimal performance

### 🔍 Advanced Search

- **Fuzzy Search**: Powered by Fuse.js for intelligent stock symbol and company name matching
- **Debounced Input**: Optimized search performance with lodash debouncing
- **Real-time Filtering**: Instant results as you type
- **API Integration**: Server-side search with RESTful API endpoints

### ⭐ Watchlist Management

- **Persistent Storage**: Watchlist data persists across browser sessions using Zustand with persistence
- **Add/Remove Stocks**: One-click functionality to manage your watchlist
- **Real-time Updates**: Live price updates for watched stocks
- **Visual Indicators**: Star icons and trending arrows for easy identification

### 📊 Stock Details Page

- **Interactive Charts**: Beautiful line charts using Recharts library
- **Multiple Time Ranges**: View data for 1D, 1W, 1M, 6M, and 1Y periods
- **Responsive Charts**: Charts adapt to different screen sizes

### 🎯 User Experience

- **Interactive Tour**: Built-in product tour using Driver.js to guide new users
- **Loading States**: Skeleton components and loading indicators for better UX
- **Tooltips**: Helpful tooltips for better user guidance
- **Smooth Animations**: CSS transitions and hover effects

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: React framework with App Router and Turbopack
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library

### State Management & Data

- **Zustand**: Lightweight state management with persistence
- **TanStack Query**: Server state management and caching
- **Fuse.js**: Fuzzy search implementation
- **Recharts**: Interactive chart library

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd FB-task
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── stocks/        # Stock-related endpoints
│   ├── stock/             # Stock details pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── search.tsx        # Search functionality
│   ├── stocks-list.tsx   # Main stocks table
│   └── watch-list.tsx    # Watchlist component
├── data/                 # Static data
│   └── stocks.ts         # Stock data
├── lib/                  # Utilities and configurations
│   ├── driver.ts         # Product tour configuration
│   ├── store.ts          # Zustand store
│   └── utils.ts          # Helper functions
└── types.ts              # TypeScript type definitions
```

## 🔧 Key Features Implementation

### State Management

The app uses Zustand for client-side state management with persistence:

- Watchlist data persists across browser sessions
- Optimistic updates for better UX
- Type-safe state management

### Search Functionality

- Server-side fuzzy search using Fuse.js
- Debounced input to prevent excessive API calls
- Real-time filtering with instant results

### Data Visualization

- Interactive line charts for historical price data
- Multiple time range options
- Responsive chart containers
- Custom tooltips and formatting

### Performance Optimizations

- Server-side rendering for initial page load
- React Query for efficient data fetching and caching
- Skeleton loading states
- Optimized bundle size with Turbopack

## 🎨 Design System

The project uses a comprehensive design system built with:

- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: Reusable UI components
- **Responsive Design**: Mobile-first approach
- **Dark Mode Ready**: Theme-aware components

## 📱 Responsive Design

The dashboard is fully responsive with:

- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactions
- Optimized table layouts for mobile

## 🔮 Future Enhancements

Potential improvements and features:

- Real-time WebSocket connections for live price updates
- Advanced charting with technical indicators
- Portfolio tracking and performance analytics
- News integration for stock-related articles
- Export functionality for watchlists
- Advanced filtering and sorting options
