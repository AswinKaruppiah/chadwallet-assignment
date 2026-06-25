import Image from "next/image";
import { formatPrice, formatAmount } from "@/utility/helper";

export default function UserPositions({ positions, activeToken }) {
  return (
    <div className="border-t border-white/5 mt-2 flex-1 flex flex-col min-h-[200px]">
      <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-tight text-white/50">Your Positions</h3>
        <span className="text-[10px] bg-white/[0.04] text-white/40 px-1.5 py-0.5 rounded font-mono">
          {positions.length} Active
        </span>
      </div>

      <div className="divide-y divide-white/5 overflow-y-auto">
        {positions.map((pos) => (
          <div key={pos.symbol} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
            {/* Token Info */}
            <div className="flex items-center gap-2.5 min-w-0">
              {pos.logo ? (
                <Image
                  src={pos.logo}
                  width={28}
                  height={28}
                  unoptimized
                  alt={pos.symbol}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#516af6]/80 to-[#a3b1ff]/80 flex items-center justify-center text-[10px] font-bold shrink-0">
                  {pos.symbol.slice(0, 2)}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white truncate">{pos.symbol}</span>
                  <span className="text-[9px] text-white/30 truncate max-w-[80px]">{pos.name}</span>
                </div>
                <div className="text-[10px] text-white/50 font-mono mt-0.5">
                  {formatAmount(pos.amount)} {pos.symbol}
                </div>
              </div>
            </div>

            {/* Value and PnL */}
            <div className="text-right">
              <div className="text-xs font-semibold text-white font-mono">
                ${formatPrice(pos.valueUsd)}
              </div>
              <div className={`text-[10px] font-mono mt-0.5 font-medium ${pos.isProfit ? "text-green-400" : "text-red-400"
                }`}>
                {pos.isProfit ? "+" : ""}${pos.pnlUsd.toFixed(2)} ({pos.isProfit ? "+" : ""}{pos.pnlPercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
