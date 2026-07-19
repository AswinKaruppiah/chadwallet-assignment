"use client";

import useSolPrice from "@/hooks/useSolPrice";
import SwapForm from "./SwapForm";
import { usePrivy } from "@privy-io/react-auth";
import useWalletBalance from "@/hooks/useWalletBalance";

export default function SwapPanel({ activeToken, loading, className = "" }) {
  const { user } = usePrivy();
  const walletAddress = user?.wallet?.address;

  const { solPrice, loading: solPriceLoading, error: solPriceError } = useSolPrice();
  const { solBalance } = useWalletBalance(walletAddress);


  return (
    <div className={`w-full lg:w-[340px] lg:border-l lg:border-t overflow-hidden lg:rounded-l-xl lg:border-white/5 flex-shrink-0 flex-col overflow-y-auto ${className}`}>
      <SwapForm
        activeToken={activeToken}
        loading={loading}
        solPrice={solPrice}
        solPriceLoading={solPriceLoading}
        solPriceError={solPriceError}
        solBalance={solBalance}
      />
    </div>
  );
}
