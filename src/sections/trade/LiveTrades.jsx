"use client";

import { useState, useEffect } from "react";
import { Clock, Users } from "lucide-react";
import { formatPrice, formatAmount } from "@/utility/helper";
import Show from "@/component/Show";

export default function LiveTrades({ activeToken, loading }) {
  const [activeTab, setActiveTab] = useState("trades");
  const [trades, setTrades] = useState([]);
  const [holders, setHolders] = useState([]);
  const [loadingTrades, setLoadingTrades] = useState(false);
  const [loadingHolders, setLoadingHolders] = useState(false);
  const [tradesError, setTradesError] = useState(null);
  const [holdersError, setHoldersError] = useState(null);

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

  const fetchTopHolders = async (address) => {
    if (!address) return;
    try {
      setLoadingHolders(true);
      const response = await fetch(`/api/holders?address=${address}&limit=10`);
      if (!response.ok) {
        throw new Error(`Failed to fetch holders: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // Calculate supply dynamically
      let supply = 0;
      if (activeToken?.marketCap && activeToken?.price) {
        supply = activeToken.marketCap / activeToken.price;
      }
      if (!supply || !isFinite(supply) || supply <= 0) {
        supply = 1_000_000_000; // default pump.fun total supply
      }

      const parsedHolders = (data.holders || []).map((item, idx) => {
        const balance = item.ui_amount || item.uiAmount || 0;
        const val = balance * (activeToken?.price || 0);
        const percentage = (balance / supply) * 100;

        const addr = item.owner || "";
        const formattedAddress = addr.length > 8
          ? `${addr.slice(0, 4)}...${addr.slice(-4)}`
          : addr;

        return {
          rank: idx + 1,
          address: formattedAddress,
          fullAddress: addr,
          balance,
          percentage: percentage > 100 ? 100 : percentage,
          value: val,
        };
      });

      setHolders(parsedHolders);
      setHoldersError(null);
    } catch (err) {
      console.error("Error fetching holders:", err);
      setHoldersError(err.message || "Failed to fetch top holders");
      setHolders([]);
    } finally {
      setLoadingHolders(false);
    }
  };

  // Fetch data when active token changes (no polling)
  useEffect(() => {
    if (!activeToken?.address) return;

    fetchLiveTrades(activeToken.address);
    fetchTopHolders(activeToken.address);
  }, [activeToken?.address]);

  return (
    <div className="border-t border-white/5 flex flex-col shrink-0 relative min-h-[300px]">
      {/* Outer Loading Overlay for Active Token Loading */}
      <Show>
        <Show.If isTrue={loading || !activeToken}>
          <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/40 z-20 bg-[#0c0c0c]/85 backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            <span>Scanning networks...</span>
          </div>
        </Show.If>
      </Show>

      {/* Tabs Menu */}
      <div className="flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-6">
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
      </div>

      <div className="flex-1 min-h-[220px] overflow-y-auto">
        <Show>
          <Show.If isTrue={activeTab === "trades"}>
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
                  <Show.If isTrue={loadingTrades && trades.length === 0}>
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
          </Show.If>

          <Show.Else>
            <table className="w-full text-left text-xs">
              <thead className="text-white/30 sticky top-0 bg-[#0c0c0c] z-10">
                <tr>
                  <th className="font-medium p-2 bg-[#0c0c0c]/80 backdrop-blur-sm">Rank</th>
                  <th className="font-medium p-2 bg-[#0c0c0c]/80 backdrop-blur-sm">Address</th>
                  <th className="font-medium p-2 text-right bg-[#0c0c0c]/80 backdrop-blur-sm">Balance</th>
                  <th className="font-medium p-2 text-right bg-[#0c0c0c]/80 backdrop-blur-sm">Percentage</th>
                  <th className="font-medium p-2 text-right bg-[#0c0c0c]/80 backdrop-blur-sm">Value (USD)</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                <Show>
                  <Show.If isTrue={loadingHolders && holders.length === 0}>
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-white/40">
                        <div className="w-5 h-5 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-2" />
                        Loading top holders...
                      </td>
                    </tr>
                  </Show.If>
                  <Show.ElseIf isTrue={!!holdersError}>
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-red-400/80">
                        {holdersError}
                      </td>
                    </tr>
                  </Show.ElseIf>
                  <Show.ElseIf isTrue={holders.length === 0}>
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-white/30">
                        No holders found.
                      </td>
                    </tr>
                  </Show.ElseIf>
                  <Show.Else>
                    {holders.map((holder) => (
                      <tr key={holder.rank} className="hover:bg-white/5 transition-colors">
                        <td className="p-2 text-white/50">{holder.rank}</td>
                        <td className="p-2 text-white/80" title={holder.fullAddress}>{holder.address}</td>
                        <td className="p-2 text-right text-white">{formatAmount(holder.balance)} {activeToken?.symbol}</td>
                        <td className="p-2 text-right text-orange-400">{holder.percentage.toFixed(2)}%</td>
                        <td className="p-2 text-right text-emerald-400">${formatPrice(holder.value)}</td>
                      </tr>
                    ))}
                  </Show.Else>
                </Show>
              </tbody>
            </table>
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}
