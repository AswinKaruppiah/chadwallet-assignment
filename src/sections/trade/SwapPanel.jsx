"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Show from "@/component/Show";
import { formatPrice } from "@/utility/helper";

const SOL_LOGO = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";
const QUICK_AMOUNTS = [25, 50, 75, 100];

export default function SwapPanel({ activeToken, loading, className = "" }) {
  const [tradeTab, setTradeTab] = useState("buy");
  const [amount, setAmount] = useState("");
  const [solPrice, setSolPrice] = useState(150); // Live price variable
  const isBuy = tradeTab === "buy";
  const solBalance = 12.45;

  useEffect(() => {
    setAmount("");
  }, [activeToken]);

  // Fetch real-time SOL price on mount
  useEffect(() => {
    async function fetchSolPrice() {
      try {
        const res = await fetch("/api/sol-price");
        if (res.ok) {
          const data = await res.json();
          if (data.price) {
            setSolPrice(data.price);
          }
        }
      } catch (err) {
        console.error("Failed to fetch SOL price:", err);
      }
    }
    fetchSolPrice();
  }, []);

  const handleAmountChange = (val) => {
    const cleanVal = val.replace(/,/g, ".");
    if (cleanVal === "" || /^\d*\.?\d*$/.test(cleanVal)) {
      setAmount(cleanVal);
    }
  };

  // Convert the entered SOL amount to the active token's quantity using dynamic prices
  const estimatedOutput = useMemo(() => {
    if (!amount || !activeToken || !solPrice) return "";
    return (Number(amount) * solPrice / activeToken.price).toFixed(4);
  }, [amount, activeToken, solPrice]);

  const solRate = useMemo(() => {
    if (!activeToken || !solPrice) return "—";
    return (solPrice / activeToken.price).toFixed(2);
  }, [activeToken, solPrice]);

  const handleQuickAmount = (pct) => {
    setAmount((solBalance * pct / 100).toFixed(4));
  };

  return (
    <div className={`w-full lg:w-[340px] flex-shrink-0 flex-col overflow-y-auto ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-[13px] font-semibold tracking-tight">Swap</h2>
        <Show>
          <Show.If isTrue={!!activeToken}>
            <span className="text-[10px] text-white/30 font-mono tabular-nums">
              1 SOL ≈ {solRate} {activeToken?.symbol}
            </span>
          </Show.If>
        </Show>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Buy/Sell Toggle */}
        <div className="flex bg-white/[0.04] rounded-lg p-0.5 gap-0.5">
          <button
            onClick={() => setTradeTab("buy")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${isBuy
              ? "bg-orange-500/15 text-orange-400"
              : "text-white/35 hover:text-white/50"
              }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeTab("sell")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${!isBuy
              ? "bg-orange-500/15 text-orange-400"
              : "text-white/35 hover:text-white/50"
              }`}
          >
            Sell
          </button>
        </div>

        {/* From Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image src={SOL_LOGO} width={20} height={20} unoptimized alt="SOL" className="rounded-full" />
              <span className="text-xs font-semibold">SOL</span>
            </div>
            <span className="text-[10px] text-white/30 font-mono tabular-nums">
              {solBalance} SOL {solPrice && `(~$${(solBalance * solPrice).toFixed(2)})`}
            </span>
          </div>
          <div className="bg-white/[0.03] ring-1 ring-white/[0.06] rounded-lg px-3 py-2.5 focus-within:ring-orange-500/30 transition-colors">
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.0"
              value={amount}
              disabled={loading}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="bg-transparent text-lg font-mono font-semibold text-white outline-none w-full placeholder:text-white/15 disabled:cursor-not-allowed disabled:text-white/30"
            />
            {amount && solPrice && (
              <span className="text-[10px] text-white/20 block mt-1 font-mono">
                ≈ ${(Number(amount) * solPrice).toFixed(2)} USD
              </span>
            )}
          </div>
          {/* Quick Amount Buttons */}
          <div className="flex gap-1.5">
            {QUICK_AMOUNTS.map((pct) => (
              <button
                key={pct}
                onClick={() => handleQuickAmount(pct)}
                disabled={loading}
                className="flex-1 py-1 text-[10px] font-medium text-white/30 bg-white/[0.03] hover:bg-orange-500/10 hover:text-orange-400/60 rounded-md transition-colors disabled:cursor-not-allowed disabled:opacity-40"
              >
                {pct}%
              </button>
            ))}
          </div>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Show>
                <Show.If isTrue={loading}>
                  <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-3 w-12 bg-white/10 rounded animate-pulse" />
                </Show.If>
                <Show.Else>
                  <Show>
                    <Show.If isTrue={!!activeToken?.logo}>
                      <Image
                        src={activeToken?.logo || ""}
                        width={20}
                        height={20}
                        unoptimized
                        alt={activeToken?.symbol || ""}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    </Show.If>
                    <Show.Else>
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-500/80 to-amber-500/80 flex items-center justify-center text-[7px] font-bold">
                        {activeToken?.symbol?.slice(0, 2)}
                      </div>
                    </Show.Else>
                  </Show>
                  <span className="text-xs font-semibold truncate max-w-[80px]">
                    {activeToken?.symbol || "—"}
                  </span>
                </Show.Else>
              </Show>
            </div>
          </div>
          <div className="bg-white/[0.03] ring-1 ring-white/[0.06] rounded-lg px-3 py-2.5">
            <input
              type="number"
              placeholder="0.0"
              disabled
              value={estimatedOutput}
              className="bg-transparent text-lg font-mono font-semibold text-white/50 outline-none w-full placeholder:text-white/15"
            />
          </div>
        </div>

        {/* Rate Info */}
        <Show>
          <Show.If isTrue={!!amount && !!estimatedOutput}>
            <div className="flex flex-col gap-1 text-[10px] text-white/25 font-mono tabular-nums px-1">
              <div className="flex items-center justify-between">
                <span>Rate</span>
                <span>1 {activeToken?.symbol} ≈ ${formatPrice(activeToken?.price)}</span>
              </div>
            </div>
          </Show.If>
        </Show>

        {/* Submit */}
        <button
          onClick={() => {
            setAmount("");
          }}
          disabled={!amount}
          className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${!amount
            ? "bg-white/[0.04] text-white/20 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-400 text-black"
            }`}
        >
          {isBuy ? "Buy" : "Sell"} {activeToken?.symbol || ""}
        </button>
      </div>
    </div>
  );
}
