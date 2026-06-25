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
    <table className="w-full text-left text-xs border-collapse">
      <thead className="sticky top-0 bg-[#060510]/80 backdrop-blur-md z-10 border-b border-white/5">
        <tr>
          <th className="font-bold text-[10px] uppercase tracking-wider text-white/35 px-4 py-3">Rank</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-white/35 px-4 py-3">Address</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-white/35 px-4 py-3 text-right">Balance</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-white/35 px-4 py-3 text-right">Percentage</th>
          <th className="font-bold text-[10px] uppercase tracking-wider text-white/35 px-4 py-3 text-right">Value (USD)</th>
        </tr>
      </thead>
      <tbody className="font-mono divide-y divide-white/[0.02]">
        <Show>
          <Show.If isTrue={loadingHolders}>
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-white/40">
                <div className="w-5 h-5 border-2 border-[#516af6]/30 border-t-[#516af6] rounded-full animate-spin mx-auto mb-2" />
                Loading top holders...
              </td>
            </tr>
          </Show.If>
          <Show.ElseIf isTrue={!!holdersError}>
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-red-400/80">
                {holdersError}
              </td>
            </tr>
          </Show.ElseIf>
          <Show.ElseIf isTrue={holders.length === 0}>
            <tr>
              <td colSpan="5" className="px-4 py-8 text-center text-white/30">
                No holders found.
              </td>
            </tr>
          </Show.ElseIf>
          <Show.Else>
            {holders.map((holder) => (
              <tr key={holder.rank} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-2.5 text-white/50">{holder.rank}</td>
                <td className="px-4 py-2.5 text-white/80" title={holder.fullAddress}>{holder.address}</td>
                <td className="px-4 py-2.5 text-right text-white/90">{formatAmount(holder.balance)} {activeToken?.symbol}</td>
                <td className="px-4 py-2.5 text-right text-[#516af6] font-semibold">{holder.percentage.toFixed(2)}%</td>
                <td className="px-4 py-2.5 text-right text-emerald-400">${formatPrice(holder.value)}</td>
              </tr>
            ))}
          </Show.Else>
        </Show>
      </tbody>
    </table>
  );
}
