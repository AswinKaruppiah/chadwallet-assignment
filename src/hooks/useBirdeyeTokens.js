import { useState, useEffect } from 'react';

const globalPromises = {};
const globalCaches = {};

export function useBirdeyeTokens(limit = 20) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTokens() {
      try {
        setLoading(true);
        setError(null);

        // Reuse client-side cache if available
        if (globalCaches[limit]) {
          if (isMounted) {
            setData(globalCaches[limit]);
            setLoading(false);
          }
          return;
        }

        // Coalesce concurrent requests into a single promise
        if (!globalPromises[limit]) {
          globalPromises[limit] = fetch(`/api/tokens?limit=${limit}`)
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
              }
              const json = await response.json();
              const tokens = json.tokens || [];
              globalCaches[limit] = tokens;
              delete globalPromises[limit];
              return tokens;
            })
            .catch((err) => {
              delete globalPromises[limit];
              throw err;
            });
        }

        const tokens = await globalPromises[limit];

        if (isMounted) {
          setData(tokens);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching tokens:", err);
          setError(err.message || 'Failed to fetch tokens');
          setLoading(false);
        }
      }
    }

    fetchTokens();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { data, loading, error };
}
