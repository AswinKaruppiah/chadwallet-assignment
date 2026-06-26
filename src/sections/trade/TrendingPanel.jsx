"use client";

import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { formatPrice, formatAmount } from "@/utility/helper";
import Show from "@/component/Show";
import Image from "next/image";

export default function TrendingPanel({
  tokens,
  loading,
  activeToken,
  setActiveToken,
  className = "",
}) {
  return (
    <div className={`w-full lg:w-[320px] flex-shrink-0 border-r overflow-hidden border-t rounded-r-xl  border-white/5 flex-col ${className}`}>
      <div className="px-4 py-2.5 border-b border-white/5 flex bg-white/5 items-center justify-between">
        <h2 className="font-semibold text-[15px] tracking-tight flex items-center gap-2">
          Trending
        </h2>
        <span className="text-[10px] text-white/30 font-mono tabular-nums">
          {tokens.length} tokens
        </span>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <Show>
          <Show.If isTrue={loading}>
            <div className="flex flex-col gap-1 p-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg"
                >
                  <div className="w-9 h-9 rounded-full bg-white/5 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-16 bg-white/5 rounded animate-pulse" />
                    <div className="h-2.5 w-24 bg-white/[0.03] rounded animate-pulse" />
                  </div>
                  <div className="space-y-2 flex flex-col items-end">
                    <div className="h-3.5 w-14 bg-white/5 rounded animate-pulse" />
                    <div className="h-2.5 w-12 bg-white/[0.03] rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </Show.If>
          <Show.Else>
            <div className="flex flex-col gap-0.5 p-1.5">
              {tokens.map((token, index) => {
                const isPositive = token.change >= 0;
                const isActive = activeToken?.address === token.address;
                return (
                  <button
                    key={token.address}
                    onClick={() => setActiveToken(token)}
                    className={`relative group flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 ${isActive
                      ? "bg-white/[0.06] before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[3px] before:bg-[#516af6] before:rounded-r"
                      : "hover:bg-white/[0.04]"
                      }`}
                  >
                    <span className={`text-[10px] font-mono w-4 text-right tabular-nums shrink-0 transition-colors ${isActive ? "text-[#516af6] font-bold" : "text-white/20"}`}>
                      {index + 1}
                    </span>

                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/[0.06] shrink-0 flex items-center justify-center ring-1 ring-white/[0.06]">
                      <Show>
                        <Show.If isTrue={!!token.logo}>
                          <Image
                            src={token.logo}
                            alt={token.symbol}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </Show.If>
                        <Show.Else>
                          <div className="w-full h-full flex items-center justify-center font-bold text-xs bg-gradient-to-br from-[#516af6]/80 to-[#a3b1ff]/80">
                            {token.symbol?.slice(0, 2)}
                          </div>
                        </Show.Else>
                      </Show>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm tracking-tight text-white/95 truncate">
                          {token.symbol}
                        </span>
                        <span
                          className={`inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full tabular-nums shrink-0 ${isPositive
                            ? "text-emerald-400 bg-emerald-500/10"
                            : "text-red-400 bg-red-500/10"
                            }`}
                        >
                          {isPositive ? (
                            <TrendingUpIcon className="w-2.5 h-2.5" />
                          ) : (
                            <TrendingDownIcon className="w-2.5 h-2.5" />
                          )}
                          {Math.abs(token.change || 0).toFixed(2)}%
                        </span>
                      </div>
                      <div className="text-white/30 text-[11px] truncate mt-0.5">
                        {token.name}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-[13px] font-medium text-white/90 tabular-nums">
                        ${formatPrice(token.price)}
                      </div>
                      <Show>
                        <Show.If isTrue={!!token.volume}>
                          <div className="text-[10px] text-white/25 font-mono tabular-nums mt-0.5">
                            Vol ${formatAmount(token.volume)}
                          </div>
                        </Show.If>
                      </Show>
                    </div>
                  </button>
                );
              })}
            </div>
          </Show.Else>
        </Show>
      </div>
    </div>
  );
}
