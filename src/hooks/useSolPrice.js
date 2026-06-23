import { useState, useEffect } from "react";

const globalPromises = {};
const globalCaches = {};
const lastFetchTimes = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes client-side cache

export default function useSolPrice(address = "So11111111111111111111111111111111111111112") {
  const [solPrice, setSolPrice] = useState(globalCaches[address] || 0);
  const [loading, setLoading] = useState(!globalCaches[address]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function fetchSolPrice() {
      try {
        const now = Date.now();
        // Return cached price if valid
        if (globalCaches[address] && now - lastFetchTimes[address] < CACHE_DURATION) {
          if (active) {
            setSolPrice(globalCaches[address]);
            setLoading(false);
          }
          return;
        }

        // Coalesce multiple concurrent calls into a single promise
        if (!globalPromises[address]) {
          const url = `/api/sol-price?address=${address}`;
          globalPromises[address] = fetch(url)
            .then(async (res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.statusText}`);
              }
              const data = await res.json();
              if (data.price) {
                globalCaches[address] = data.price;
                lastFetchTimes[address] = Date.now();
                delete globalPromises[address];
                return data.price;
              } else {
                throw new Error("Invalid price data format");
              }
            })
            .catch((err) => {
              delete globalPromises[address];
              throw err;
            });
        }

        const price = await globalPromises[address];
        if (active) {
          setSolPrice(price);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Failed to load price");
          if (globalCaches[address]) {
            setSolPrice(globalCaches[address]);
          }
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchSolPrice();

    return () => {
      active = false;
    };
  }, [address]);

  return { solPrice, loading, error };
}
