import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, TrendingUp, AlertTriangle } from "lucide-react";

interface TradingFiltersProps {
  onFiltersChange: (filters: {
    vwapProximity: number[];
    fibonacciLevel: string;
    dilutionScore: string;
  }) => void;
}

const TradingFilters = ({ onFiltersChange }: TradingFiltersProps) => {
  const [vwapProximity, setVwapProximity] = useState([5]);
  const [fibonacciLevel, setFibonacciLevel] = useState("all");
  const [dilutionScore, setDilutionScore] = useState("all");

  const handleVwapChange = (value: number[]) => {
    setVwapProximity(value);
    onFiltersChange({ vwapProximity: value, fibonacciLevel, dilutionScore });
  };

  const handleFibChange = (value: string) => {
    setFibonacciLevel(value);
    onFiltersChange({ vwapProximity, fibonacciLevel: value, dilutionScore });
  };

  const handleDilutionChange = (value: string) => {
    setDilutionScore(value);
    onFiltersChange({ vwapProximity, fibonacciLevel, dilutionScore: value });
  };

  const clearFilters = () => {
    setVwapProximity([5]);
    setFibonacciLevel("all");
    setDilutionScore("all");
    onFiltersChange({ vwapProximity: [5], fibonacciLevel: "all", dilutionScore: "all" });
  };

  return (
    <div className="bg-card border border-trading-border rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Trading Filters</h2>
        <Button variant="outline" size="sm" onClick={clearFilters} className="ml-auto">
          Clear All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* VWAP Proximity Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-trading-info" />
            <label className="text-sm font-medium text-foreground">VWAP Proximity</label>
            <Badge variant="outline" className="text-xs">
              {vwapProximity[0]}%
            </Badge>
          </div>
          <div className="px-2">
            <Slider
              value={vwapProximity}
              onValueChange={handleVwapChange}
              max={20}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0%</span>
              <span>20%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Distance from upper VWAP band
          </p>
        </div>

        {/* Fibonacci Level Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-trading-warning" />
            <label className="text-sm font-medium text-foreground">Fibonacci Level</label>
          </div>
          <Select value={fibonacciLevel} onValueChange={handleFibChange}>
            <SelectTrigger className="bg-trading-bg-tertiary border-trading-border">
              <SelectValue placeholder="Select Fibonacci level" />
            </SelectTrigger>
            <SelectContent className="bg-trading-bg-secondary border-trading-border">
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="61.8">61.8% Retracement</SelectItem>
              <SelectItem value="78.6">78.6% Retracement</SelectItem>
              <SelectItem value="both">61.8% & 78.6%</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Key resistance levels for reversals
          </p>
        </div>

        {/* Dilution Score Filter */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-trading-danger" />
            <label className="text-sm font-medium text-foreground">Dilution Risk</label>
          </div>
          <Select value={dilutionScore} onValueChange={handleDilutionChange}>
            <SelectTrigger className="bg-trading-bg-tertiary border-trading-border">
              <SelectValue placeholder="Select dilution risk" />
            </SelectTrigger>
            <SelectContent className="bg-trading-bg-secondary border-trading-border">
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="low">Low Risk</SelectItem>
              <SelectItem value="medium">Medium Risk</SelectItem>
              <SelectItem value="high">High Risk</SelectItem>
              <SelectItem value="very-high">Very High Risk</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            AI-calculated dilution probability
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradingFilters;