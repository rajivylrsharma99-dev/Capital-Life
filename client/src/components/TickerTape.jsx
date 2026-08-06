import React, { useEffect, useRef, useState } from 'react';

const REFRESH_MS = 60_000;

const inr = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function apiBase() {
  return import.meta.env.VITE_API_URL !== undefined ? import.meta.env.VITE_API_URL : '';
}

function Quote({ quote }) {
  const up = quote.change >= 0;
  const color = up ? 'text-[#22c55e]' : 'text-[#ef4444]';
  const sign = up ? '+' : '';
  // Share prices are rupees; index levels are points, so no symbol on those.
  const prefix = quote.kind === 'stock' ? '₹' : '';

  return (
    <span className="inline-flex items-baseline gap-2 px-6 whitespace-nowrap">
      <span className="font-semibold tracking-wide text-white">{quote.label}</span>
      <span className="text-gray-300">
        {prefix}
        {inr.format(quote.price)}
      </span>
      <span className={`${color} font-medium`}>
        {sign}
        {inr.format(quote.change)} ({sign}
        {quote.changePercent.toFixed(2)}%)
      </span>
    </span>
  );
}

export default function TickerTape() {
  const [quotes, setQuotes] = useState([]);
  const [failed, setFailed] = useState(false);
  const everLoaded = useRef(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch(`${apiBase()}/api/quotes`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.quotes?.length) {
          everLoaded.current = true;
          setQuotes(data.quotes);
          setFailed(false);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Ticker quote fetch failed:', err);
          // Keep the last good prices on screen; only show the notice if we never got any.
          if (!everLoaded.current) setFailed(true);
        }
      }
    }

    load();
    const timer = setInterval(load, REFRESH_MS);

    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, []);

  if (failed && quotes.length === 0) {
    return (
      <div className="w-full bg-[#131722] text-gray-400 text-xs py-2 text-center">
        Market data temporarily unavailable
      </div>
    );
  }

  if (quotes.length === 0) {
    return <div className="w-full bg-[#131722] h-[38px]" aria-hidden="true" />;
  }

  return (
    <div
      role="region"
      aria-label="Live Indian market prices"
      className="ticker-bar w-full bg-[#131722] overflow-hidden py-2 text-[13px]"
    >
      {/* Two identical tracks side by side make the scroll loop seamless.
          Pause-on-hover lives in index.css — see .ticker-bar:hover. */}
      <div className="ticker-track flex w-max">
        {[0, 1].map((track) => (
          <div key={track} className="flex" aria-hidden={track === 1 ? 'true' : undefined}>
            {quotes.map((q) => (
              <Quote key={`${track}-${q.label}`} quote={q} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
