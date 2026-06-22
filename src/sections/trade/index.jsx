"use client";

import { useState, useEffect } from "react";
import { useBirdeyeTokens } from "@/hooks/useBirdeyeTokens";
import TopBar from "@/component/TopBar";
import TrendingPanel from "./TrendingPanel";
import ChartPanel from "./ChartPanel";
import SwapPanel from "./SwapPanel";

export default function TradeDashboard() {
  const { data: rawTokens, loading } = useBirdeyeTokens();
  const [activeToken, setActiveToken] = useState(null);

  const tokens = rawTokens?.map((t) => ({
    address: t.address,
    symbol: t.symbol,
    name: t.name,
    price: t.price || 0,
    change: t.price_change_24h_percent || 0,
    logo: t.logo_uri || "",
    volume: t.volume_24h_usd || 0,
    liquidity: t.liquidity || 0,
    marketCap: t.market_cap || 0,
    holders: t.holder || 0,
  })) || [];

  const handleSelectToken = (token) => {
    setActiveToken(token);
    if (token?.symbol) {
      const url = new URL(window.location);
      url.searchParams.set("token", token.symbol.toLowerCase());
      window.history.pushState(null, "", url.toString());
    }
  };

  // Set initial token when loading completes (based on URL params or default to first token)
  useEffect(() => {
    if (tokens.length > 0 && !activeToken) {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");
      if (urlToken) {
        const matched = tokens.find(
          (t) =>
            t.symbol?.toLowerCase() === urlToken.toLowerCase() ||
            t.address?.toLowerCase() === urlToken.toLowerCase()
        );
        if (matched) {
          setActiveToken(matched);
          return;
        }
      }
      const defaultToken = tokens[0];
      setActiveToken(defaultToken);
      if (defaultToken?.symbol) {
        const url = new URL(window.location);
        url.searchParams.set("token", defaultToken.symbol.toLowerCase());
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, [tokens, activeToken]);

  // Sync state if URL query params change (e.g. back/forward navigation)
  useEffect(() => {
    const handleURLChange = () => {
      if (tokens.length === 0) return;
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get("token");
      if (urlToken) {
        const matched = tokens.find(
          (t) =>
            t.symbol?.toLowerCase() === urlToken.toLowerCase() ||
            t.address?.toLowerCase() === urlToken.toLowerCase()
        );
        if (matched && activeToken?.address !== matched.address) {
          setActiveToken(matched);
        }
      }
    };

    window.addEventListener("popstate", handleURLChange);
    return () => window.removeEventListener("popstate", handleURLChange);
  }, [tokens, activeToken]);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden font-sans">
      {/* Top Navbar */}
      <div className="px-4 border-b border-white/5">
        <TopBar />
      </div>

      {/* Main Grid Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
        {/* LEFT: Trending Tokens */}
        <TrendingPanel
          tokens={tokens}
          loading={loading}
          activeToken={activeToken}
          setActiveToken={handleSelectToken}
        />

        {/* MIDDLE: Price Chart & Info */}
        <ChartPanel activeToken={activeToken} loading={loading} />

        {/* RIGHT: Swaps & Positions */}
        <SwapPanel activeToken={activeToken} loading={loading} />
      </div>
    </div>
  );
}
export { TradeDashboard };
