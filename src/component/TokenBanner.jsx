"use client";

import { useState } from "react";
import Image from "next/image";

const MOCK_TOKENS = [
  { symbol: "SOL", name: "Solana", price: 176.42, change: 3.21, image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" },
  { symbol: "BONK", name: "Bonk", price: 0.00002841, change: -2.15, image: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I" },
  { symbol: "WIF", name: "dogwifhat", price: 1.87, change: 5.67, image: "https://bafkreibk3covs5ltyqxa272uodhculbr6kea6betiez7oz4nqbd3qrd3jm.ipfs.nftstorage.link" },
  { symbol: "JUP", name: "Jupiter", price: 0.98, change: 1.43, image: "https://static.jup.ag/jup/icon.png" },
  { symbol: "RENDER", name: "Render", price: 10.24, change: -0.89, image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/rndrizKT3MK1iimdxRdWabcF7Zg7AR5T4nud4EkHBof/logo.png" },
  { symbol: "RAY", name: "Raydium", price: 3.56, change: 2.78, image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R/logo.png" },
  { symbol: "PYTH", name: "Pyth Network", price: 0.41, change: -1.32, image: "https://pyth.network/token.svg" },
  { symbol: "ORCA", name: "Orca", price: 4.12, change: 0.56, image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE/logo.png" },
  { symbol: "SAMO", name: "Samoyed", price: 0.012, change: 8.91, image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU/logo.png" },
  { symbol: "MANGO", name: "Mango", price: 0.057, change: -3.45, image: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac/token.png" },
];

function formatPrice(price) {
  if (price < 0.001) return `$${price.toFixed(8)}`;
  if (price < 1) return `$${price.toFixed(4)}`;
  return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function TokenCard({ token, onClick, onHover }) {
  const isPositive = token.change >= 0;

  return (
    <button
      onClick={() => onClick?.(token)}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full pl-1 pr-4 transition-all duration-200 cursor-pointer shrink-0"
    >
      <Image
        src={token.image}
        alt={token.symbol}
        width={32}
        height={32}
        className="rounded-full object-cover bg-white/10"
      />
      <span className="text-white font-bold text-sm">{token.symbol}</span>
      <span className="text-white/50 text-sm">{formatPrice(token.price)}</span>
      <span className={`text-xs font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
        {isPositive ? "+" : ""}{token.change.toFixed(2)}%
      </span>
    </button>
  );
}

export default function TokenBanner({ direction = "left", onTokenClick }) {
  const [paused, setPaused] = useState(false);
  const tokens = direction === "left" ? MOCK_TOKENS : [...MOCK_TOKENS].reverse();

  return (
    <div
      className="relative w-full overflow-hidden py-2"
    >
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />
      <div
        className="flex w-max will-change-transform"
        style={{
          animation: `marquee-${direction} 30s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <div className="flex gap-3 pr-3">
          {tokens.map((token, i) => (
            <TokenCard key={`a-${token.symbol}-${i}`} token={token} onClick={onTokenClick} onHover={setPaused} />
          ))}
        </div>
        <div className="flex gap-3 pr-3">
          {tokens.map((token, i) => (
            <TokenCard key={`b-${token.symbol}-${i}`} token={token} onClick={onTokenClick} onHover={setPaused} />
          ))}
        </div>
      </div>
    </div>
  );
}
