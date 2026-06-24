"use client";

import { useEffect, useState } from "react";
import TokenInfoHeader from "./TokenInfoHeader";
import Show from "@/component/Show";
import TradeActivityPanel from "./TradeActivityPanel";

export default function ChartPanel({ activeToken, loading, className = "" }) {
  const [chartLoaded, setChartLoaded] = useState(false);

  const poolAddr = activeToken?.poolAddress || activeToken?.address;
  const src = poolAddr
    ? `https://www.geckoterminal.com/solana/pools/${poolAddr}?embed=1&info=0&swaps=0&light_chart=0&chart_type=market_cap&resolution=5m&bg_color=101010`
    : "";

  useEffect(() => {
    if (activeToken) {
      setChartLoaded(false);
    }
  }, [activeToken]);

  return (
    <div className={`flex-1 flex-col border-r border-white/5 relative overflow-y-auto ${className}`}>
      <TokenInfoHeader activeToken={activeToken} loading={loading} />

      {/* Chart Area */}
      <div className="h-[400px] min-h-[400px] max-h-[400px] w-full relative bg-[#101010]">
        <Show>
          <Show.If isTrue={loading || !activeToken}>
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/40 z-20 bg-[#101010]">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              Scanning networks...
            </div>
          </Show.If>
          <Show.ElseIf isTrue={!chartLoaded}>
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/40 z-20 bg-[#101010]">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              Loading chart...
            </div>
          </Show.ElseIf>
        </Show>
        <Show>
          <Show.If isTrue={!!activeToken}>
            <iframe
              id="geckoterminal-embed"
              title="GeckoTerminal Embed"
              src={src || "about:blank"}
              onLoad={() => setChartLoaded(true)}
              allow="clipboard-write"
              allowFullScreen
              style={{ width: "100%", height: "100%" }}
            />
          </Show.If>
        </Show>
      </div>

      <TradeActivityPanel activeToken={activeToken} loading={loading} />
    </div>
  );
}
