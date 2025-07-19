import { useState } from "react";
import TradingFilters from "@/components/TradingFilters";
import ReversalLeaderboard from "@/components/ReversalLeaderboard";
import StockDeepDive from "@/components/StockDeepDive";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, Zap, BarChart3, RefreshCw } from "lucide-react";

interface Stock {
  ticker: string;
  reversalScore: number;
  keySignal: string;
  price: number;
  priceChange: number;
  priceChangePercent: number;
  dilutionRisk: "Low" | "Medium" | "High" | "Very High";
  volume: number;
  avgVolume: number;
  vwapDistance: number;
  fibLevel: number;
  rsi: number;
}

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [filters, setFilters] = useState({
    vwapProximity: [5],
    fibonacciLevel: "all",
    dilutionScore: "all"
  });

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedStock(null), 300);
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    // In a real app, this would trigger a re-fetch of data
    console.log("Filters updated:", newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-trading-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-trading-danger/20 to-trading-glow/20 rounded-lg">
                <TrendingDown className="w-8 h-8 text-trading-danger" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AgentiTrade</h1>
                <p className="text-sm text-muted-foreground">Gapper Spotlight & Reversal Leaderboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge className="bg-trading-success/20 text-trading-success border-trading-success/30">
                <div className="w-2 h-2 bg-trading-success rounded-full mr-2 animate-pulse" />
                Live Market Data
              </Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button className="bg-trading-glow hover:bg-trading-glow/90">
                <Zap className="w-4 h-4 mr-2" />
                AI Analysis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Real-Time Short Trading Opportunities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered analysis of small-cap stocks with the highest reversal potential. 
            Featuring VWAP rejection patterns, Fibonacci resistance levels, and dilution risk assessment.
          </p>
          
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-trading-glow" />
              <span className="text-sm font-medium text-foreground">Multi-Agent Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-trading-danger" />
              <span className="text-sm font-medium text-foreground">Reversal Signals</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-trading-warning" />
              <span className="text-sm font-medium text-foreground">Real-Time Data</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <TradingFilters onFiltersChange={handleFiltersChange} />

        {/* Leaderboard */}
        <ReversalLeaderboard onStockSelect={handleStockSelect} />
      </main>

      {/* Stock Deep Dive Panel */}
      <StockDeepDive 
        stock={selectedStock}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

      {/* Overlay for panel */}
      {isPanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={handleClosePanel}
        />
      )}
    </div>
  );
};

export default Index;
