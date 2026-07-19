import { useState, useEffect, useCallback } from "react";

const RPC_URL = "https://api.mainnet-beta.solana.com";

export default function useWalletBalance(walletAddress) {
  const [solBalance, setSolBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalances = useCallback(async () => {
    if (!walletAddress) {
      setSolBalance(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch SOL Balance (getBalance JSON-RPC call)
      const res = await fetch(RPC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "getBalance",
          params: [walletAddress],
        }),
      });
      if (!res.ok) throw new Error("Failed to fetch SOL balance");
      const json = await res.json();
      if (json.error) throw new Error(json.error.message || "SOL RPC Error");
      const lamports = json.result?.value || 0;
      setSolBalance(lamports / 1e9); // Convert lamports to SOL
    } catch (err) {
      console.error("Error fetching wallet balance:", err);
      setError(err.message || "Failed to fetch balances");
    } finally {
      setLoading(false);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  return { solBalance, loading, error, refetch: fetchBalances };
}
