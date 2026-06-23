"use client";

import { useState } from "react";
import { TrendingUpIcon, TrendingDownIcon, CopyIcon, CheckIcon } from "lucide-react";
import { formatPrice, formatAmount } from "@/utility/helper";
import Show from "@/component/Show";
import Image from "next/image";

export default function TokenInfoHeader({ activeToken, loading }) {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (!activeToken?.address) return;
    navigator.clipboard.writeText(activeToken.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Show>
      <Show.If isTrue={loading || !activeToken}>
        <div className="px-4 py-2 border-b border-white/5 bg-white/5 backdrop-blur-md z-10 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/10" />
            <div className="h-4 w-16 bg-white/10 rounded" />
            <div className="h-3.5 w-8 bg-white/5 rounded" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-16 bg-white/10 rounded" />
            <div className="h-3.5 w-12 bg-white/10 rounded-full" />
            <div className="w-px h-4 bg-white/[0.06]" />
            <div className="h-4 w-20 bg-white/10 rounded" />
          </div>
        </div>
      </Show.If>
      <Show.Else >
        <div className="px-4 py-2 border-b border-white/5 bg-white/5 backdrop-blur-md z-10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-white/[0.06] shrink-0 flex items-center justify-center ring-1 ring-white/[0.08]">
              <Show>
                <Show.If isTrue={!!activeToken?.logo}>
                  <Image src={activeToken?.logo} alt={activeToken?.symbol} fill unoptimized className="object-cover" />
                </Show.If>
                <Show.Else>
                  <div className="w-full h-full bg-gradient-to-br from-orange-500/80 to-amber-500/80 flex items-center justify-center font-bold text-[10px]">
                    {activeToken?.symbol?.slice(0, 2)}
                  </div>
                </Show.Else>
              </Show>
            </div>
            <h1 className="text-sm font-bold tracking-tight">{activeToken?.symbol}</h1>
            <span className="text-white/20 text-[11px]">/ USD</span>
            <button
              onClick={copyAddress}
              className="text-white/20 hover:text-white/50 transition-colors p-0.5"
              title="Copy contract address"
            >
              <Show>
                <Show.If isTrue={copied}>
                  <CheckIcon className="w-3 h-3 text-emerald-400" />
                </Show.If>
                <Show.Else>
                  <CopyIcon className="w-3 h-3" />
                </Show.Else>
              </Show>
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-[12px] font-mono tabular-nums">
            <span className="font-semibold text-white">${formatPrice(activeToken?.price)}</span>
            <span
              className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${activeToken?.change >= 0
                ? "text-emerald-400 bg-emerald-500/10"
                : "text-red-400 bg-red-500/10"
                }`}
            >
              <Show>
                <Show.If isTrue={activeToken?.change >= 0}>
                  <TrendingUpIcon className="w-2.5 h-2.5" />
                </Show.If>
                <Show.Else>
                  <TrendingDownIcon className="w-2.5 h-2.5" />
                </Show.Else>
              </Show>
              {activeToken?.change >= 0 ? "+" : ""}{(activeToken?.change || 0).toFixed(2)}%
            </span>
            <div className="w-px h-4 bg-white/[0.06]" />
            <span className="text-white/40 text-[11px]">Vol <span className="text-white/70">${formatAmount(activeToken?.volume)}</span></span>
            <span className="hidden md:inline text-white/40 text-[11px]">Liq <span className="text-white/70">${formatAmount(activeToken?.liquidity)}</span></span>
          </div>
        </div>
      </Show.Else>
    </Show>
  );
}
