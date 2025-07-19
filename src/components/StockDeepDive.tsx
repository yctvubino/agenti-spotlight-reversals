import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  X, 
  TrendingDown, 
  BarChart3, 
  AlertTriangle, 
  Target,
  Clock,
  DollarSign,
  Volume2,
  Activity,
  Brain,
  Zap
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

interface StockDeepDiveProps {
  stock: Stock | null;
  isOpen: boolean;
  onClose: () => void;
}

const StockDeepDive = ({ stock, isOpen, onClose }: StockDeepDiveProps) => {
  if (!stock || !isOpen) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "bg-trading-success/20 text-trading-success border-trading-success/30";
      case "Medium": return "bg-trading-warning/20 text-trading-warning border-trading-warning/30";
      case "High": return "bg-trading-danger/20 text-trading-danger border-trading-danger/30";
      case "Very High": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted/20 text-muted-foreground";
    }
  };

  const aiInsights = [
    {
      agent: "Grant",
      role: "Short Trading Specialist",
      insight: `Strong reversal setup at ${stock.fibLevel}% Fibonacci resistance. VWAP rejection pattern forming with ${stock.vwapDistance}% distance suggests institutional selling pressure.`,
      confidence: 92
    },
    {
      agent: "Sophia",
      role: "Pattern Recognition",
      insight: `Volume spike to ${((stock.volume / stock.avgVolume) * 100).toFixed(0)}% of average indicates potential exhaustion. RSI at ${stock.rsi.toFixed(1)} confirms overbought conditions.`,
      confidence: 87
    },
    {
      agent: "Phil",
      role: "Investment Banker",
      insight: `${stock.dilutionRisk} dilution risk based on recent warrant activity and cash runway analysis. Monitor for upcoming offering announcements.`,
      confidence: 89
    }
  ];

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-card border-l border-trading-border shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-trading-danger/20 to-trading-warning/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-trading-danger" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{stock.ticker}</h2>
              <p className="text-sm text-muted-foreground">Deep Dive Analysis</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Price & Score Overview */}
        <Card className="mb-6 bg-gradient-to-br from-trading-bg-secondary to-trading-bg-tertiary border-trading-border">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-foreground">${stock.price.toFixed(2)}</div>
                <div className={`flex items-center gap-1 text-sm ${stock.priceChange >= 0 ? 'text-trading-success' : 'text-trading-danger'}`}>
                  <span>{stock.priceChange >= 0 ? '+' : ''}{stock.priceChange.toFixed(2)}</span>
                  <span>({stock.priceChangePercent >= 0 ? '+' : ''}{stock.priceChangePercent.toFixed(2)}%)</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-trading-danger">{stock.reversalScore}</div>
                <div className="text-sm text-muted-foreground">Reversal Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="mb-6 bg-card border-trading-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-primary" />
              Key Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-trading-info" />
                  <span className="text-sm font-medium">VWAP Distance</span>
                </div>
                <div className="text-lg font-semibold text-foreground">+{stock.vwapDistance}%</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-trading-warning" />
                  <span className="text-sm font-medium">RSI</span>
                </div>
                <div className="text-lg font-semibold text-foreground">{stock.rsi.toFixed(1)}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium">Fibonacci</span>
                </div>
                <div className="text-lg font-semibold text-foreground">{stock.fibLevel}%</div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium">Vol Ratio</span>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {((stock.volume / stock.avgVolume)).toFixed(1)}x
                </div>
              </div>
            </div>
            
            <Separator className="bg-trading-border" />
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-trading-danger" />
                <span className="text-sm font-medium">Dilution Risk</span>
              </div>
              <Badge className={`${getRiskColor(stock.dilutionRisk)} font-medium`}>
                {stock.dilutionRisk}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* AI Agent Insights */}
        <Card className="mb-6 bg-card border-trading-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-trading-glow" />
              AI Agent Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="border border-trading-border/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-trading-glow/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-trading-glow">{insight.agent[0]}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{insight.agent}</div>
                      <div className="text-xs text-muted-foreground">{insight.role}</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence}% confidence
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.insight}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trading Actions */}
        <Card className="bg-gradient-to-br from-trading-danger/10 to-trading-warning/10 border-trading-danger/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-trading-danger" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-trading-danger hover:bg-trading-danger/90 text-white">
              <TrendingDown className="w-4 h-4 mr-2" />
              Short Position Setup
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Set Alert
              </Button>
              <Button variant="outline" size="sm">
                <DollarSign className="w-4 h-4 mr-2" />
                Options Chain
              </Button>
            </div>
            <div className="text-xs text-muted-foreground p-2 bg-trading-bg-quaternary rounded">
              ⚠️ This is AI analysis for educational purposes. Always conduct your own research before trading.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockDeepDive;