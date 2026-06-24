"use client";

import { useState, useEffect } from "react";
import { formatPrice, formatAmount } from "@/utility/helper";
import Show from "@/component/Show";

export default function LiveTrades({ activeToken }) {
  const [trades, setTrades] = useState([]);
  const [loadingTrades, setLoadingTrades] = useState(false);
  const [tradesError, setTradesError] = useState(null);

  const fetchLiveTrades = async (address) => {
    if (!address) return;
    try {
      setLoadingTrades(true);
      const response = await fetch(`/api/trades?address=${address}&limit=10`);
      if (!response.ok) {
        throw new Error(`Failed to fetch trades: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const parsedTrades = (data.trades || []).map((item) => {
        const isBase = item.base?.address?.toLowerCase() === address.toLowerCase();
        const targetToken = isBase ? item.base : item.quote;
        const otherToken = isBase ? item.quote : item.base;

        const amount = targetToken ? (targetToken.uiAmount || Number(targetToken.amount) / Math.pow(10, targetToken.decimals || 6)) : 0;
        const price = item.tokenPrice || targetToken?.price || activeToken?.price || 0;

        // Compute total USD. If other token exists, use its value. Else fall back.
        const totalUsd = otherToken
          ? (otherToken.uiAmount * (otherToken.price || item.quotePrice || 0))
          : (amount * price);

        const date = new Date(item.blockUnixTime * 1000);
        const time = date.toLocaleTimeString([], { hour12: false });

        return {
          id: item.txHash,
          type: item.side || "buy",
          price,
          amount,
          totalUsd,
          time,
        };
      });

      setTrades(parsedTrades);
      setTradesError(null);
    } catch (err) {
      console.error("Error fetching trades:", err);
      setTradesError(err.message || "Failed to fetch live trades");
      setTrades([]);
    } finally {
      setLoadingTrades(false);
    }
  };

  // Fetch data when active token changes
  useEffect(() => {
    if (!activeToken?.address) return;

    fetchLiveTrades(activeToken.address);
  }, [activeToken?.address]);

  return (
    <table className="w-full text-left text-xs">
      <thead className="text-white/30 sticky top-0 bg-[#0c0c0c] z-10">
        <tr>
          <th className="font-medium p-2 bg-[#0c0c0c]/80 backdrop-blur-sm">Time</th>
          <th className="font-medium p-2 bg-[#0c0c0c]/80 backdrop-blur-sm">Type</th>
          <th className="font-medium p-2 text-right bg-[#0c0c0c]/80 backdrop-blur-sm">Price</th>
          <th className="font-medium p-2 text-right bg-[#0c0c0c]/80 backdrop-blur-sm">Amount ({activeToken?.symbol || "Token"})</th>
          <th className="font-medium p-2 text-right bg-[#0c0c0c]/80 backdrop-blur-sm">Total (USD)</th>
        </tr>
      </thead>
      <tbody className="font-mono">
        <Show>
          <Show.If isTrue={loadingTrades}>
            <tr>
              <td colSpan="5" className="p-8 text-center text-white/40">
                <div className="w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-2" />
                Loading live trades...
              </td>
            </tr>
          </Show.If>
          <Show.ElseIf isTrue={!!tradesError}>
            <tr>
              <td colSpan="5" className="p-8 text-center text-red-400/80">
                {tradesError}
              </td>
            </tr>
          </Show.ElseIf>
          <Show.ElseIf isTrue={trades.length === 0}>
            <tr>
              <td colSpan="5" className="p-8 text-center text-white/30">
                No trades found.
              </td>
            </tr>
          </Show.ElseIf>
          <Show.Else>
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-white/5 transition-colors">
                <td className="p-2 text-white/50">{trade.time}</td>
                <td className={`p-2 font-bold ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                  {trade.type.toUpperCase()}
                </td>
                <td className="p-2 text-right">${formatPrice(trade.price)}</td>
                <td className="p-2 text-right">{formatAmount(trade.amount)}</td>
                <td className="p-2 text-right">${formatPrice(trade.totalUsd)}</td>
              </tr>
            ))}
          </Show.Else>
        </Show>
      </tbody>
    </table>
  );
}
