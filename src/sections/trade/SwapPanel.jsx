"use client";

import { useState, useEffect } from "react";
import { ArrowDownIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SwapPanel({ activeToken }) {
  const [tradeTab, setTradeTab] = useState("buy");
  const [amount, setAmount] = useState("");

  // Reset inputs when active token changes
  useEffect(() => {
    setAmount("");
  }, [activeToken]);

  return (
    <div className="w-full lg:w-[360px] flex-shrink-0 flex flex-col overflow-y-auto">
      {/* Swap Interface */}
      <div className="p-5 border-b border-white/5">
        <div className="flex bg-white/5 rounded-xl p-1 mb-6 relative">
          {/* Animated Tab Background */}
          <motion.div
            className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-lg ${tradeTab === "buy"
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-red-500/20 border border-red-500/30"
              } z-0`}
            animate={{ left: tradeTab === "buy" ? "4px" : "calc(50% + 0px)" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
          <button
            onClick={() => setTradeTab("buy")}
            className={`flex-1 py-2 text-sm font-bold z-10 transition-colors ${tradeTab === "buy" ? "text-green-400" : "text-white/40 hover:text-white"
              }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeTab("sell")}
            className={`flex-1 py-2 text-sm font-bold z-10 transition-colors ${tradeTab === "sell" ? "text-red-400" : "text-white/40 hover:text-white"
              }`}
          >
            Sell
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Input Field */}
          <div className="bg-[#0a0a0e] border border-white/10 rounded-2xl p-4 transition-all focus-within:border-white/30">
            <div className="flex justify-between text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">
              <span>Pay</span>
              <span>Balance: 12.45 SOL</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent text-2xl font-mono font-bold text-white outline-none w-full placeholder:text-white/20"
              />
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full shrink-0">
                <Image src="/assets/tokens/solana.png" width={16} height={16} alt="SOL" className="rounded-full" />
                <span className="font-bold text-sm">SOL</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-3 relative z-10">
            <div className="bg-[#1a1a1f] p-1.5 rounded-full border border-white/10">
              <ArrowDownIcon className="w-4 h-4 text-white/50" />
            </div>
          </div>

          {/* Output Field */}
          <div className="bg-[#0a0a0e] border border-white/10 rounded-2xl p-4 transition-all opacity-80">
            <div className="flex justify-between text-xs text-white/40 mb-2 font-medium uppercase tracking-wider">
              <span>Receive (Est.)</span>
              <span>Balance: 0.00 {activeToken?.symbol}</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0.0"
                disabled
                value={amount && activeToken ? (Number(amount) * 145.2 / activeToken.price).toFixed(2) : ""}
                className="bg-transparent text-2xl font-mono font-bold text-white outline-none w-full placeholder:text-white/20"
              />
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full shrink-0">
                {activeToken?.logo ? (
                  <Image
                    src={activeToken.logo}
                    width={16}
                    height={16}
                    alt={activeToken.symbol}
                    className="w-4 h-4 rounded-full object-cover animate-fadeIn"
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-orange-500" />
                )}
                <span className="font-bold text-sm truncate max-w-[60px]">{activeToken?.symbol || "TOKEN"}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className={`w-full mt-2 py-4 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all active:scale-[0.98] ${tradeTab === "buy"
              ? "bg-green-500 hover:bg-green-400 text-black shadow-green-500/20"
              : "bg-red-500 hover:bg-red-400 text-black shadow-red-500/20"
              }`}
          >
            {tradeTab === "buy" ? `Buy ${activeToken?.symbol || ""}` : `Sell ${activeToken?.symbol || ""}`}
          </button>
        </div>
      </div>
    </div>
  );
}
