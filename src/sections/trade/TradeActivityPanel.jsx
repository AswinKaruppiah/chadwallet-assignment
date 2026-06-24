"use client";

import { useState } from "react";
import LiveTrades from "./LiveTrades";
import TopHolders from "./TopHolders";
import Show from "@/component/Show";
import { Clock, Users } from "lucide-react";

export default function TradeActivityPanel({ activeToken, loading }) {
  const [activeTab, setActiveTab] = useState("trades");

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
            className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "trades"
                ? "text-white border-orange-500"
                : "text-white/40 hover:text-white border-transparent"
            }`}
          >
            <Clock className="w-4 h-4" /> Live Trades
          </button>
          <button
            onClick={() => setActiveTab("holders")}
            className={`py-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "holders"
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
            <LiveTrades activeToken={activeToken} />
          </Show.If>
          <Show.Else>
            <TopHolders activeToken={activeToken} />
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}
