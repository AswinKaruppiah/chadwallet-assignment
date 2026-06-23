"use client";

import { useEffect, useState } from "react";
import LiveTrades from "./LiveTrades";
import TokenInfoHeader from "./TokenInfoHeader";
import Show from "@/component/Show";

export default function ChartPanel({ activeToken, loading, className = "" }) {
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const src = activeToken?.address
    ? `https://birdeye.so/tv-widget/${activeToken.address}?chain=solana`
    : "";

  const showLoading = activeToken && (loading || !hasLoadedOnce);

  useEffect(() => {
    if (activeToken) {
      setHasLoadedOnce(false);
    }
  }, [activeToken?.address, activeToken?.symbol]);

  return (
    <div className={`flex-1 flex-col border-r border-white/5 relative overflow-y-auto ${className}`}>
      <TokenInfoHeader activeToken={activeToken} loading={showLoading} />

      {/* Chart Area */}
      <div className="h-[400px] min-h-[400px] max-h-[400px] w-full relative bg-[#0a0a0e]">
        <Show>
          <Show.If isTrue={loading || !activeToken}>
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/40 z-20 bg-[#0a0a0e]">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              Scanning networks...
            </div>
          </Show.If>
          <Show.ElseIf isTrue={!!activeToken && !hasLoadedOnce}>
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center gap-3 text-white/40 z-20 bg-[#0a0a0e]">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
              Loading chart...
            </div>
          </Show.ElseIf>
        </Show>
        <Show>
          <Show.If isTrue={!!activeToken}>
            <iframe
              src={src || "about:blank"}
              onLoad={() => { setHasLoadedOnce(true); }}
              width="100%"
              height="100%"
              className="border-none w-full h-full relative z-10 pointer-events-auto"
              allowFullScreen
            />
          </Show.If>
        </Show>
      </div>

      <LiveTrades activeToken={activeToken} />
    </div>
  );
}
