import { NextResponse } from 'next/server';

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 60 * 60 * 1000; // 1 hour (3,600,000 ms)

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get('limit')) || 20, 50);

  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const apiKey = process.env.BIRDEYE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  const url = `https://public-api.birdeye.so/defi/v3/token/list?sort_by=liquidity&sort_type=desc&limit=${limit}&ui_amount_mode=scaled`;

  const res = await fetch(url, {
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
  const tokens = json?.data?.items || [];

  cache = { data: { tokens }, timestamp: now };

  return NextResponse.json({ tokens });
}
