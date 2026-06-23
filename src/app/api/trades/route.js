import { NextResponse } from 'next/server';

let cache = {}; // address -> { data, timestamp }
const CACHE_TTL = 10 * 1000; // 10 seconds for trades

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const limit = Math.min(Number(searchParams.get('limit')) || 15, 50);

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  const now = Date.now();
  const cacheKey = `${address}_${limit}`;
  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_TTL) {
    return NextResponse.json(cache[cacheKey].data);
  }

  const apiKey = process.env.BIRDEYE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const url = `https://public-api.birdeye.so/defi/txs/token?address=${address}&limit=${limit}&tx_type=swap&sort_type=desc`;
    const res = await fetch(url, {
      headers: {
        'x-chain': 'solana',
        'accept': 'application/json',
        'X-API-KEY': apiKey,
      },
    });

    if (!res.ok) {
      if (cache[cacheKey]) {
        return NextResponse.json(cache[cacheKey].data);
      }
      return NextResponse.json(
        { error: `Birdeye API returned ${res.status}` },
        { status: res.status }
      );
    }

    const json = await res.json();
    if (json.success === false) {
      if (cache[cacheKey]) {
        return NextResponse.json(cache[cacheKey].data);
      }
      return NextResponse.json({ error: json.message || 'Birdeye request failed' }, { status: 429 });
    }

    const trades = json?.data?.items || [];
    const responseData = { trades };

    cache[cacheKey] = { data: responseData, timestamp: now };

    return NextResponse.json(responseData);
  } catch (err) {
    console.error("Error in trades route:", err);
    if (cache[cacheKey]) {
      return NextResponse.json(cache[cacheKey].data);
    }
    return NextResponse.json({ error: err.message || 'Failed to fetch trades' }, { status: 500 });
  }
}
