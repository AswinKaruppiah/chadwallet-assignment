"use client";

import { useState, useEffect } from "react";
import Show from "@/component/Show";
import LiveTrades from "./LiveTrades";
import TokenInfoHeader from "./TokenInfoHeader";

export default function ChartPanel({ activeToken, loading }) {
  const [chartSource, setChartSource] = useState("tv");

  const getTradingViewSymbol = (symbol) => {
    if (!symbol) return "BINANCE:SOLUSDT";
    const upper = symbol.toUpperCase();
    if (upper === "SOL") return "BINANCE:SOLUSDT";
    if (upper === "USDC") return "BINANCE:USDCUSDT";
    if (upper === "USDT") return "BINANCE:USDTUSD";
    return `MEXC:${upper}USDT`;
  };

  const [tvLoading, setTvLoading] = useState(true);
  const [dexLoading, setDexLoading] = useState(true);

  useEffect(() => {
    if (activeToken) {
      setTvLoading(true);
      setDexLoading(true);
    }
  }, [activeToken?.address, activeToken?.symbol]);

  const isChartLoading = chartSource === "tv" ? tvLoading : dexLoading;

  return (
    <div className="flex-1 flex flex-col border-r border-white/5 relative overflow-y-auto">
      <TokenInfoHeader activeToken={activeToken} loading={loading} />

      {/* Chart Area */}
      <div className="flex-1 min-h-[400px] relative">
        {/* Chart Source Toggle */}
        <Show>
          <Show.If isTrue={!loading && !!activeToken}>
            <div className="absolute top-3 right-3 z-20 flex bg-[#0e0e12]/80 backdrop-blur-md ring-1 ring-white/[0.08] rounded-full p-0.5 gap-0.5 text-[11px] font-medium">
              <button
                onClick={() => setChartSource("tv")}
                className={`px-3 py-1.5 rounded-full transition-colors ${chartSource === "tv"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
                  }`}
              >
                TradingView
              </button>
              <button
                onClick={() => setChartSource("dex")}
                className={`px-3 py-1.5 rounded-full transition-colors ${chartSource === "dex"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
                  }`}
              >
                DEXScreener
              </button>
            </div>
          </Show.If>
        </Show>

        {/* Loading Spinner */}
        <Show>
          <Show.If isTrue={loading}>
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/40 z-10 bg-[#0a0a0e]">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              Scanning networks...
            </div>
          </Show.If>
        </Show>

        {/* Chart Load State Overlay */}
        <Show>
          <Show.If isTrue={!loading && !!activeToken && isChartLoading}>
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/40 z-10 bg-[#0a0a0e]">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              Loading chart...
            </div>
          </Show.If>
        </Show>

        {/* Chart containers (always mounted to prevent layout re-creation, toggled via CSS hidden) */}
        <div className={`absolute inset-0 w-full h-full ${(!activeToken || loading) ? "hidden" : ""}`}>
          <div className={`w-full h-full ${chartSource !== "tv" ? "hidden" : ""}`}>
            <Show>
              <Show.If isTrue={!!activeToken}>
                <iframe
                  src={`https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(getTradingViewSymbol(activeToken?.symbol))}&theme=dark&interval=15&style=1&timezone=Etc%2FUTC&locale=en`}
                  width="100%"
                  height="100%"
                  className="pointer-events-auto border-none w-full h-full"
                  onLoad={() => setTvLoading(false)}
                />
              </Show.If>
            </Show>
          </div>
          <div className={`w-full h-full ${chartSource !== "dex" ? "hidden" : ""}`}>
            <Show>
              <Show.If isTrue={!!activeToken}>
                <iframe
                  src={`https://dexscreener.com/solana/${activeToken?.address}?embed=1&theme=dark&trades=0&info=0`}
                  width="100%"
                  height="100%"
                  className="pointer-events-auto border-none w-full h-full"
                  onLoad={() => setDexLoading(false)}
                />
              </Show.If>
            </Show>
          </div>
        </div>

        {/* Fallback */}
        <Show>
          <Show.If isTrue={!loading && !activeToken}>
            <div className="absolute inset-0 w-full h-full flex items-center justify-center text-white/20 z-10 bg-[#0a0a0e]">
              Select a token to view chart
            </div>
          </Show.If>
        </Show>
      </div>

      {/* Bottom Data: Live Trades */}
      <LiveTrades activeToken={activeToken} />
    </div>
  );
}
