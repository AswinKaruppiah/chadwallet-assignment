// Format numbers
export const formatPrice = (price) => {
  if (!price) return "0.00";
  if (price < 0.0001) return price.toExponential(4);
  if (price < 1) return price.toPrecision(4);
  return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
};

export const formatAmount = (num) => {
  if (!num) return "0";
  if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
  if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
  return num.toFixed(2);
};

export const generateMockTrades = (price) => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    type: Math.random() > 0.5 ? "buy" : "sell",
    price: price * (1 + (Math.random() * 0.02 - 0.01)),
    amount: Math.random() * 5000 + 100,
    time: new Date(Date.now() - Math.random() * 100000).toLocaleTimeString([], { hour12: false }),
  }));
};

export const generateMockHolders = (price) => {
  const baseShares = [15.2, 9.4, 7.1, 5.5, 4.2, 3.1, 2.4, 1.8, 1.3, 0.95];
  return baseShares.map((baseShare, i) => {
    const percentage = baseShare * (0.95 + Math.random() * 0.1);
    const totalSupply = 100000000; // 100M tokens
    const balance = (totalSupply * percentage) / 100;
    return {
      rank: i + 1,
      address: `${Math.random().toString(36).substring(2, 6).toUpperCase()}...${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      balance: balance,
      percentage: percentage,
      value: balance * price,
    };
  });
};

export const getTradingViewSymbol = (symbol) => {
  if (!symbol) return "BINANCE:SOLUSDT";
  const upper = symbol.toUpperCase();
  if (upper === "SOL") return "BINANCE:SOLUSDT";
  if (upper === "USDC") return "BINANCE:USDCUSDT";
  if (upper === "USDT") return "BINANCE:USDTUSD";
  return `MEXC:${upper}USDT`;
};

