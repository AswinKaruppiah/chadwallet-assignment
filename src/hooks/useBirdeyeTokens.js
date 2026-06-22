import { useState, useEffect } from 'react';

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

        const response = await fetch(`/api/tokens?limit=${limit}`);

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const json = await response.json();

        if (isMounted) {
          setData(json.tokens || []);
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
