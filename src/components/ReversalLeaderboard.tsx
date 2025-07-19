import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  ChevronRight,
  Eye,
  Zap,
  BarChart3
} from "lucide-react";

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

interface ReversalLeaderboardProps {
  onStockSelect: (stock: Stock) => void;
}

const mockStocks: Stock[] = [
  {
    ticker: "BNGO",
    reversalScore: 94,
    keySignal: "VWAP Rejection",
    price: 8.45,
    priceChange: -0.23,
    priceChangePercent: -2.65,
    dilutionRisk: "Very High",
    volume: 2840000,
    avgVolume: 1200000,
    vwapDistance: 2.1,
    fibLevel: 78.6,
    rsi: 76.4
  },
  {
    ticker: "TLRY",
    reversalScore: 89,
    keySignal: "Fib 61.8%",
    price: 12.67,
    priceChange: 0.34,
    priceChangePercent: 2.76,
    dilutionRisk: "High",
    volume: 1950000,
    avgVolume: 850000,
    vwapDistance: 4.7,
    fibLevel: 61.8,
    rsi: 73.2
  },
  {
    ticker: "SNDL",
    reversalScore: 87,
    keySignal: "Overbought RSI",
    price: 3.21,
    priceChange: 0.12,
    priceChangePercent: 3.88,
    dilutionRisk: "Medium",
    volume: 5600000,
    avgVolume: 2100000,
    vwapDistance: 6.3,
    fibLevel: 78.6,
    rsi: 79.1
  },
  {
    ticker: "RIOT",
    reversalScore: 84,
    keySignal: "Volume Spike",
    price: 15.89,
    priceChange: -0.67,
    priceChangePercent: -4.05,
    dilutionRisk: "High",
    volume: 3200000,
    avgVolume: 1400000,
    vwapDistance: 1.8,
    fibLevel: 61.8,
    rsi: 68.7
  },
  {
    ticker: "AMC",
    reversalScore: 82,
    keySignal: "VWAP Rejection",
    price: 7.23,
    priceChange: -0.45,
    priceChangePercent: -5.86,
    dilutionRisk: "Very High",
    volume: 8900000,
    avgVolume: 3500000,
    vwapDistance: 3.2,
    fibLevel: 78.6,
    rsi: 71.5
  }
];

const ReversalLeaderboard = ({ onStockSelect }: ReversalLeaderboardProps) => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-trading-success/20 text-trading-success border-trading-success/30";
      case "Medium": return "bg-trading-warning/20 text-trading-warning border-trading-warning/30";
      case "High": return "bg-trading-danger/20 text-trading-danger border-trading-danger/30";
      case "Very High": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "VWAP Rejection": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Fib 61.8%": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Fib 78.6%": return "bg-indigo-500/20 text-indigo-400 border-indigo-500/30";
      case "Overbought RSI": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Volume Spike": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-trading-danger";
    if (score >= 80) return "text-trading-warning";
    if (score >= 70) return "text-trading-info";
    return "text-muted-foreground";
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(0)}K`;
    return volume.toString();
  };

  const handleRowClick = (stock: Stock) => {
    setSelectedStock(stock.ticker);
    onStockSelect(stock);
  };

  return (
    <Card className="bg-card border-trading-border">
      <div className="p-6 border-b border-trading-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-trading-danger/20 to-trading-warning/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-trading-danger" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reversal Leaderboard</h1>
              <p className="text-muted-foreground">Top short trading opportunities ranked by AI reversal signals</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-trading-success/10 text-trading-success border-trading-success/30">
              Live Data
            </Badge>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Watchlist
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-trading-border bg-trading-bg-secondary/50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Ticker</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Reversal Score
                </div>
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Key Signal</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Volume</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Dilution Risk</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Details</th>
            </tr>
          </thead>
          <tbody>
            {mockStocks.map((stock, index) => (
              <tr 
                key={stock.ticker}
                onClick={() => handleRowClick(stock)}
                className={`
                  border-b border-trading-border/50 cursor-pointer transition-all duration-200
                  hover:bg-trading-bg-secondary/50 hover:border-trading-border
                  ${selectedStock === stock.ticker ? 'bg-trading-bg-secondary/70 border-trading-glow/30' : ''}
                `}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-trading-glow/20 to-trading-info/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-foreground">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-foreground">{stock.ticker}</div>
                      <div className="text-xs text-muted-foreground">
                        RSI: {stock.rsi.toFixed(1)} | VWAP: +{stock.vwapDistance}%
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`text-2xl font-bold ${getScoreColor(stock.reversalScore)}`}>
                      {stock.reversalScore}
                    </div>
                    <div className="flex flex-col">
                      <div className="w-16 h-2 bg-trading-bg-quaternary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            stock.reversalScore >= 90 ? 'bg-trading-danger' : 
                            stock.reversalScore >= 80 ? 'bg-trading-warning' : 'bg-trading-info'
                          }`}
                          style={{ width: `${stock.reversalScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">/ 100</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`${getSignalColor(stock.keySignal)} font-medium`}>
                    {stock.keySignal}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    Fib: {stock.fibLevel}%
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-foreground">
                      ${stock.price.toFixed(2)}
                    </span>
                    <div className={`flex items-center gap-1 text-sm ${
                      stock.priceChange >= 0 ? 'text-trading-success' : 'text-trading-danger'
                    }`}>
                      {stock.priceChange >= 0 ? 
                        <TrendingUp className="w-3 h-3" /> : 
                        <TrendingDown className="w-3 h-3" />
                      }
                      <span>{stock.priceChange >= 0 ? '+' : ''}{stock.priceChange.toFixed(2)}</span>
                      <span>({stock.priceChangePercent >= 0 ? '+' : ''}{stock.priceChangePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{formatVolume(stock.volume)}</span>
                    <div className="text-xs text-muted-foreground">
                      Avg: {formatVolume(stock.avgVolume)}
                    </div>
                    <div className={`text-xs font-medium ${
                      stock.volume > stock.avgVolume * 2 ? 'text-trading-danger' : 'text-trading-success'
                    }`}>
                      {((stock.volume / stock.avgVolume) * 100).toFixed(0)}% of avg
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge className={`${getRiskColor(stock.dilutionRisk)} font-medium`}>
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {stock.dilutionRisk}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm" className="text-trading-glow hover:bg-trading-glow/10">
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ReversalLeaderboard;