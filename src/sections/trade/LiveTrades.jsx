"use client";

import { useState, useEffect } from "react";
import { Clock, Users } from "lucide-react";
import { formatPrice, formatAmount, generateMockTrades, generateMockHolders } from "@/utility/helper";
import Show from "@/component/Show";

export default function LiveTrades({ activeToken }) {
  const [activeTab, setActiveTab] = useState("trades");
  const [mockTrades, setMockTrades] = useState([]);
  const [mockHolders, setMockHolders] = useState([]);

  // Generate mock data when active token changes
  useEffect(() => {
    if (!activeToken) return;

    // 1. Generate simulated live trades
    setMockTrades(generateMockTrades(activeToken.price));

    // 2. Generate simulated top holders
    setMockHolders(generateMockHolders(activeToken.price));

    // Simulate real-time ticks for trades
    const interval = setInterval(() => {
      setMockTrades((prev) => [
        {
          id: Date.now(),
          type: Math.random() > 0.55 ? "buy" : "sell", // slight buy bias
          price: activeToken.price * (1 + (Math.random() * 0.006 - 0.003)),
          amount: Math.random() * 800 + 50,
          time: new Date().toLocaleTimeString([], { hour12: false }),
        },
        ...prev.slice(0, 14),
      ]);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeToken]);

  return (
    <div className="border-t border-white/5 flex flex-col shrink-0">
      <div className="flex items-center gap-6 px-4 border-b border-white/5">
        <button
          onClick={() => setActiveTab("trades")}
          className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "trades"
            ? "text-white border-orange-500"
            : "text-white/40 hover:text-white border-transparent"
            }`}
        >
          <Clock className="w-4 h-4" /> Live Trades
        </button>
        <button
          onClick={() => setActiveTab("holders")}
          className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${activeTab === "holders"
            ? "text-white border-orange-500"
            : "text-white/40 hover:text-white border-transparent"
            }`}
        >
          <Users className="w-4 h-4" /> Top Holders
        </button>
      </div>

      <div className="flex-1">
        <Show>
          <Show.If isTrue={activeTab === "trades"}>
            <table className="w-full text-left text-xs">
              <thead className="text-white/30 sticky top-0 bg-gray-50/5 z-10">
                <tr>
                  <th className="font-medium p-2">Time</th>
                  <th className="font-medium p-2">Type</th>
                  <th className="font-medium p-2 text-right">Price</th>
                  <th className="font-medium p-2 text-right">Amount ({activeToken?.symbol || "Token"})</th>
                  <th className="font-medium p-2 text-right">Total (USD)</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {mockTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-2 text-white/50">{trade.time}</td>
                    <td className={`p-2 font-bold ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                      {trade.type.toUpperCase()}
                    </td>
                    <td className="p-2 text-right">${formatPrice(trade.price)}</td>
                    <td className="p-2 text-right">{trade.amount.toFixed(2)}</td>
                    <td className="p-2 text-right">${(trade.price * trade.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Show.If>

          <Show.Else>
            <table className="w-full text-left text-xs">
              <thead className="text-white/30 sticky top-0 bg-gray-50/5 z-10">
                <tr>
                  <th className="font-medium p-2">Rank</th>
                  <th className="font-medium p-2">Address</th>
                  <th className="font-medium p-2 text-right">Balance</th>
                  <th className="font-medium p-2 text-right">Percentage</th>
                  <th className="font-medium p-2 text-right">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {mockHolders.map((holder) => (
                  <tr key={holder.rank} className="hover:bg-white/5 transition-colors">
                    <td className="p-2 text-white/50">{holder.rank}</td>
                    <td className="p-2 text-white/80">{holder.address}</td>
                    <td className="p-2 text-right text-white">{formatAmount(holder.balance)} {activeToken?.symbol}</td>
                    <td className="p-2 text-right text-orange-400">{holder.percentage.toFixed(2)}%</td>
                    <td className="p-2 text-right text-emerald-400">${formatPrice(holder.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}
