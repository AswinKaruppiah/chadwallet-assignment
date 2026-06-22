"use client";

import { useState, useEffect } from "react";
import Show from "@/component/Show";
import LiveTrades from "./LiveTrades";
import TokenInfoHeader from "./TokenInfoHeader";

export default function ChartPanel({ activeToken, loading }) {
  const [chartSource, setChartSource] = useState("tv");

  // Load TradingView chart widget dynamically
  useEffect(() => {
    if (!activeToken || chartSource !== "tv" || loading) return;

    const containerId = "tradingview_chart_container";
    const scriptId = "tradingview-tv-script";
    let script = document.getElementById(scriptId);

    const getTradingViewSymbol = (symbol) => {
      if (!symbol) return "BINANCE:SOLUSDT";
      const upper = symbol.toUpperCase();
      if (upper === "SOL") return "BINANCE:SOLUSDT";
      if (upper === "USDC") return "BINANCE:USDCUSDT";
      if (upper === "USDT") return "BINANCE:USDTUSD";
      return `MEXC:${upper}USDT`;
    };

    const initWidget = () => {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = ""; // clear previous widget instances
      }
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: getTradingViewSymbol(activeToken.symbol),
          interval: "15",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
          container_id: containerId,
        });
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.onload = initWidget;
      document.head.appendChild(script);
    } else {
      if (window.TradingView) {
        initWidget();
      } else {
        script.onload = initWidget;
      }
    }
  }, [activeToken, chartSource, loading]);

  return (
    <div className="flex-1 flex flex-col border-r border-white/5 relative overflow-y-auto">
      <TokenInfoHeader activeToken={activeToken} loading={loading} />

      {/* Chart Area */}
      <div className="flex-1 min-h-[400px] relative">
        {/* Chart Source Toggle */}
        <Show>
          <Show.If isTrue={!loading && !!activeToken}>
            <div className="absolute top-3 right-3 z-20 flex bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-0.5 text-[11px] font-bold">
              <button
                onClick={() => setChartSource("tv")}
                className={`px-2.5 py-1 rounded-md transition-all duration-200 ${chartSource === "tv"
                  ? "bg-orange-500 text-black shadow-md"
                  : "text-white/60 hover:text-white"
                  }`}
              >
                TradingView
              </button>
              <button
                onClick={() => setChartSource("dex")}
                className={`px-2.5 py-1 rounded-md transition-all duration-200 ${chartSource === "dex"
                  ? "bg-orange-500 text-black shadow-md"
                  : "text-white/60 hover:text-white"
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

        {/* Chart container itself (permanently in DOM, toggled via visibility to prevent widget race conditions) */}
        <div className={`absolute inset-0 w-full h-full ${(!activeToken || loading) ? "hidden" : ""}`}>
          <Show>
            <Show.If isTrue={chartSource === "tv"}>
              <div id="tradingview_chart_container" className="w-full h-full animate-fadeIn" />
            </Show.If>
            <Show.Else>
              {activeToken && (
                <iframe
                  src={`https://dexscreener.com/solana/${activeToken.address}?embed=1&theme=dark&trades=0&info=0`}
                  width="100%"
                  height="100%"
                  className="pointer-events-auto border-none animate-fadeIn w-full h-full"
                />
              )}
            </Show.Else>
          </Show>
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
