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
    <table className="w-full text-left text-xs border-collapse">
      <thead className="sticky top-0 bg-white/[0.03] backdrop-blur-md z-10 border-b border-white/5">
        <tr>
          <th className="font-bold text-[10px] uppercase tracking-wider text-[#a3b1ff]/70 px-4 py-2.5">Time</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-[#a3b1ff]/70 px-4 py-2.5">Type</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-[#a3b1ff]/70 px-4 py-2.5 text-right">Price</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-[#a3b1ff]/70 px-4 py-2.5 text-right">Amount ({activeToken?.symbol || "Token"})</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-[#a3b1ff]/70 px-4 py-2.5 text-right">Total (USD)</th>
        </tr>
      </thead>
      <tbody className="font-mono divide-y divide-white/[0.02]">
        <Show>
          <Show.If isTrue={loadingTrades}>
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-white/40">
                <div className="w-5 h-5 border-2 border-[#516af6]/30 border-t-[#516af6] rounded-full animate-spin mx-auto mb-2" />
                Loading live trades...
              </td>
            </tr>
          </Show.If>
          <Show.ElseIf isTrue={!!tradesError}>
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-red-400/80">
                {tradesError}
              </td>
            </tr>
          </Show.ElseIf>
          <Show.ElseIf isTrue={trades.length === 0}>
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-white/30">
                No trades found.
              </td>
            </tr>
          </Show.ElseIf>
          <Show.Else>
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-2.5 text-white/50">{trade.time}</td>
                <td className={`px-4 py-2.5 font-bold ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                  {trade.type.toUpperCase()}
                </td>
                <td className="px-4 py-2.5 text-right text-white/90">${formatPrice(trade.price)}</td>
                <td className="px-4 py-2.5 text-right text-white/90">{formatAmount(trade.amount)}</td>
                <td className="px-4 py-2.5 text-right text-white/95">${formatPrice(trade.totalUsd)}</td>
              </tr>
            ))}
          </Show.Else>
        </Show>
      </tbody>
    </table>
  );
}
