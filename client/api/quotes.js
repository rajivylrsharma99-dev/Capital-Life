// Live Indian market data for the site ticker: NSE indices + large-cap share prices.
//
// Fetched server-side on purpose. The previous TradingView embed talked to a
// market-data host straight from the browser, and ad blockers / privacy DNS
// filters routinely kill those requests — that is what produced the red "!"
// markers on every symbol. Nothing here is reachable from the client, so there
// is nothing for a blocker to match on.
//
// Two upstreams, because neither one covers both jobs on its free tier:
//   - Indices: NSE's allIndices feed — every index in a single request.
//   - Shares:  BSE's scrip header API — NSE's per-stock endpoint is behind bot
//              protection and returns Access Denied, so BSE serves these.
// BSE and NSE last-traded prices differ by paise on liquid large caps.

const NSE_INDICES_URL = 'https://www.nseindia.com/api/allIndices';
const BSE_SCRIP_URL = 'https://api.bseindia.com/BseIndiaAPI/api/getScripHeaderData/w';

// Indices to show, in display order. Keys must match NSE's `indexSymbol` exactly.
const INDICES = [
  ['NIFTY 50', 'NIFTY 50'],
  ['NIFTY BANK', 'BANK NIFTY'],
  ['NIFTY NEXT 50', 'NIFTY NEXT 50'],
  ['NIFTY MIDCAP 100', 'MIDCAP 100'],
  ['NIFTY IT', 'IT'],
  ['NIFTY AUTO', 'AUTO'],
  ['NIFTY PHARMA', 'PHARMA'],
  ['NIFTY FMCG', 'FMCG'],
  ['NIFTY METAL', 'METAL'],
  ['NIFTY ENERGY', 'ENERGY'],
  ['INDIA VIX', 'INDIA VIX'],
];

// Large caps, by BSE scrip code. Codes verified against the API's own company names.
const STOCKS = [
  ['500325', 'RELIANCE'],
  ['532540', 'TCS'],
  ['500180', 'HDFC BANK'],
  ['500209', 'INFOSYS'],
  ['532174', 'ICICI BANK'],
  ['500112', 'SBI'],
];

// Both exchanges serve their APIs to browser-shaped requests only.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36';

const NSE_HEADERS = {
  'User-Agent': UA,
  Accept: '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.nseindia.com/',
};

const BSE_HEADERS = {
  'User-Agent': UA,
  Accept: 'application/json, text/plain, */*',
  'Accept-Language': 'en-US,en;q=0.9',
  Referer: 'https://www.bseindia.com/',
  Origin: 'https://www.bseindia.com',
};

// BSE returns strings like "1319.40" and "+38.05"; parseFloat handles the sign.
function num(value) {
  const n = parseFloat(value);
  return Number.isFinite(n) ? n : null;
}

async function fetchIndices() {
  const resp = await fetch(NSE_INDICES_URL, { headers: NSE_HEADERS });
  if (!resp.ok) throw new Error(`NSE responded ${resp.status}`);

  const body = await resp.json();
  if (!Array.isArray(body?.data)) throw new Error('Unexpected NSE payload shape');

  const bySymbol = new Map(body.data.map((row) => [row.indexSymbol, row]));

  return INDICES.reduce((out, [symbol, label]) => {
    const row = bySymbol.get(symbol);
    if (row && typeof row.last === 'number') {
      out.push({
        kind: 'index',
        label,
        price: row.last,
        change: typeof row.variation === 'number' ? row.variation : 0,
        changePercent: typeof row.percentChange === 'number' ? row.percentChange : 0,
      });
    }
    return out;
  }, []);
}

async function fetchStock([scripCode, label]) {
  const url = `${BSE_SCRIP_URL}?Debtflag=&scripcode=${scripCode}&seriesid=`;
  const resp = await fetch(url, { headers: BSE_HEADERS });
  if (!resp.ok) throw new Error(`${label}: BSE responded ${resp.status}`);

  const rate = (await resp.json())?.CurrRate;
  const price = num(rate?.LTP);
  if (price === null) throw new Error(`${label}: no last-traded price`);

  return {
    kind: 'stock',
    label,
    price,
    change: num(rate?.Chg) ?? 0,
    changePercent: num(rate?.PcChg) ?? 0,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // One slow or failing upstream must not take the whole ticker down.
  const settled = await Promise.allSettled([
    fetchIndices(),
    ...STOCKS.map((s) => fetchStock(s)),
  ]);

  const quotes = [];
  for (const result of settled) {
    if (result.status === 'fulfilled') {
      quotes.push(...(Array.isArray(result.value) ? result.value : [result.value]));
    } else {
      console.error('quote source failed:', result.reason?.message);
    }
  }

  if (quotes.length === 0) {
    return res.status(502).json({ error: 'Market data unavailable' });
  }

  // Edge-cache 60s; prefer serving slightly stale over hammering the exchanges.
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
  return res.status(200).json({ quotes, updatedAt: new Date().toISOString() });
}
