"use client";

import { useState } from "react";
import Image from "next/image";
import { useBirdeyeTokens } from "@/hooks/useBirdeyeTokens";
import { formatPrice } from "@/utility/helper";
import Show from "@/component/Show";
import { useRouter } from "nextjs-toploader/app";

function TokenCard({ token, onClick, onHover }) {
  const isPositive = token.change >= 0;

  return (
    <button
      onClick={() => onClick?.(token)}
      onMouseEnter={() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        onHover?.(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        onHover?.(false);
      }}
      onTouchStart={() => onHover?.(true)}
      onTouchEnd={() => onHover?.(false)}
      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full pl-1 py-1 pr-4 transition-all duration-200 cursor-pointer shrink-0"
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/10 shrink-0 flex items-center justify-center">
        <Show>
          <Show.If isTrue={!!token.image}>
            <Image src={token.image} alt={token.symbol} fill unoptimized className="object-cover" />
          </Show.If>
          <Show.Else>
            <div className="w-full h-full flex items-center justify-center font-bold text-[10px] bg-gradient-to-br from-[#516af6]/80 to-[#a3b1ff]/80 rounded-full">
              {token.symbol?.slice(0, 2)}
            </div>
          </Show.Else>
        </Show>
      </div>
      <span className="text-white font-bold text-sm">{token.symbol}</span>
      <span className="text-white/50 text-sm">${formatPrice(token.price)}</span>
      <span className={`text-xs font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {isPositive ? "+" : ""}{token.change.toFixed(2)}%
      </span>
    </button>
  );
}

export default function TokenBanner({ direction = "left", onTokenClick }) {
  const router = useRouter();
  const [paused, setPaused] = useState(false);
  const { data: apiTokens, loading } = useBirdeyeTokens(20);

  const mappedApiTokens = apiTokens?.map(t => ({
    symbol: t.symbol,
    name: t.name,
    price: t.price || 0,
    change: t.price_change_24h_percent || 0,
    image: t.logo_uri || "",
    volume: t.volume_24h_usd || 0,
  })) || [];

  const handleTokenClick = (token) => {
    if (onTokenClick) {
      onTokenClick(token);
    } else {
      router.push(`/trade?token=${token.symbol.toLowerCase()}`);
    }
  };

  if (loading) {
    return (
      <div className="relative w-full overflow-hidden min-h-14 py-2">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
        <div className="flex gap-3 px-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-full pl-1 py-1 pr-4 shrink-0 animate-pulse"
            >
              <div className="w-8 h-8 rounded-full bg-white/10" />
              <div className="w-10 h-3 rounded bg-white/10" />
              <div className="w-14 h-3 rounded bg-white/10" />
              <div className="w-10 h-3 rounded bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (mappedApiTokens.length === 0) {
    return <div className="h-12 w-full py-2" />;
  }

  const tokens = direction === "left" ? mappedApiTokens : [...mappedApiTokens].reverse();

  return (
    <div
      className="relative w-full overflow-hidden min-h-14 py-2"
    >
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
      <div
        className="flex w-max will-change-transform"
        style={{
          animation: `marquee-${direction} 60s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="flex gap-3 pr-3">
          {tokens.map((token, i) => (
            <TokenCard key={`a-${token.symbol}-${i}`} token={token} onClick={handleTokenClick} onHover={setPaused} />
          ))}
        </div>
        <div className="flex gap-3 pr-3">
          {tokens.map((token, i) => (
            <TokenCard key={`b-${token.symbol}-${i}`} token={token} onClick={handleTokenClick} onHover={setPaused} />
          ))}
        </div>
      </div>
    </div>
  );
}
