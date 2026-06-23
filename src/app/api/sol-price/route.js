import { NextResponse } from 'next/server';

let cache = { price: null, timestamp: 0 };
const CACHE_TTL = 30 * 1000; // 30 seconds cache

export async function GET() {
  const now = Date.now();
  if (cache.price && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ price: cache.price });
  }

  // Use the API key from environment variables or fallback to the provided key
  const apiKey = process.env.BIRDEYE_API_KEY;

  // SOL address is So11111111111111111111111111111111111111112
  const url = 'https://public-api.birdeye.so/defi/price?address=So11111111111111111111111111111111111111112';

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'x-chain': 'solana',
        accept: 'application/json',
        'X-API-KEY': apiKey,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Birdeye API returned ${res.status}` },
        { status: res.status }
      );
    }

    const json = await res.json();
    const price = json?.data?.value;

    if (!price) {
      return NextResponse.json({ error: 'Invalid price response structure' }, { status: 500 });
    }

    cache = { price, timestamp: now };

    return NextResponse.json({ price });
  } catch (err) {
    console.error('Error fetching SOL price:', err);
    return NextResponse.json({ error: 'Failed to fetch SOL price' }, { status: 500 });
  }
}
