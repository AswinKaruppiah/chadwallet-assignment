"use client";

import { useMemo } from "react";
import useSolPrice from "@/hooks/useSolPrice";
import SwapForm from "./SwapForm";
import UserPositions from "./UserPositions";

const SOL_LOGO = "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png";

export default function SwapPanel({ activeToken, loading, className = "" }) {
  const { solPrice, loading: solPriceLoading, error: solPriceError } = useSolPrice();
  const solBalance = 12.45;

  const positions = useMemo(() => {
    const list = [
      {
        symbol: "SOL",
        name: "Solana",
        amount: solBalance,
        valueUsd: solPrice ? solBalance * solPrice : 0,
        pnlUsd: 42.80,
        pnlPercent: 2.61,
        isProfit: true,
        logo: SOL_LOGO,
      }
    ];

    if (activeToken && activeToken.symbol !== "SOL") {
      // Mock entry for active token
      const mockAmount = 250000;
      const valueUsd = mockAmount * (activeToken.price || 0);
      list.push({
        symbol: activeToken.symbol,
        name: activeToken.name || activeToken.symbol,
        amount: mockAmount,
        valueUsd: valueUsd,
        pnlUsd: valueUsd * 0.12, // mock 12% profit
        pnlPercent: 12.0,
        isProfit: true,
        logo: activeToken.logo,
      });
    }

    return list;
  }, [activeToken, solPrice, solBalance]);

  return (
    <div className={`w-full lg:w-[340px] border-l border-t overflow-hidden rounded-l-xl border-white/5 flex-shrink-0 flex-col overflow-y-auto ${className}`}>
      <SwapForm
        activeToken={activeToken}
        loading={loading}
        solPrice={solPrice}
        solPriceLoading={solPriceLoading}
        solPriceError={solPriceError}
        solBalance={solBalance}
      />
      <UserPositions
        positions={positions}
        activeToken={activeToken}
      />
    </div>
  );
}
