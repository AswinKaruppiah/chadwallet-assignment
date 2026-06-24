"use client";

import { useState, useEffect } from "react";
import { formatPrice, formatAmount } from "@/utility/helper";
import Show from "@/component/Show";

export default function TopHolders({ activeToken }) {
  const [holders, setHolders] = useState([]);
  const [loadingHolders, setLoadingHolders] = useState(false);
  const [holdersError, setHoldersError] = useState(null);

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

  // Fetch data when active token changes
  useEffect(() => {
    if (!activeToken?.address) return;

    fetchTopHolders(activeToken.address);
  }, [activeToken?.address]);

  return (
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
  );
}
