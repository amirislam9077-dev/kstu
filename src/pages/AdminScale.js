import React, { useEffect, useMemo, useState } from 'react';

// Scale: sales as bar charts — month by month (last 12 months), day by day
// (last 30 days) and by collection. One series per chart, so one colour.

const money = (value) => `Rs.${Math.round(Number(value) || 0).toLocaleString('en-PK')}`;

// Short axis labels: Rs.4.4M, Rs.350K
const short = (value) => {
  const v = Number(value) || 0;
  if (v >= 1e6) return `${(v / 1e6).toFixed(v >= 1e7 ? 0 : 1)}M`;
  if (v >= 1e3) return `${Math.round(v / 1e3)}K`;
  return String(Math.round(v));
};

const pad = (n) => String(n).padStart(2, '0');
const dayString = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

// A round top value and 4 grid steps, e.g. 0 / 1.25M / 2.5M / 3.75M / 5M
const niceScale = (max) => {
  if (max <= 0) return { top: 4, ticks: [0, 1, 2, 3, 4] };
  const raw = max / 4;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * power).find((s) => s >= raw);
  return { top: step * 4, ticks: [0, 1, 2, 3, 4].map((i) => i * step) };
};

// Vertical bars with a grid, hover tooltip and a few direct labels
const BarChart = ({ rows, height = 240, labelEvery = 1 }) => {
  const [hover, setHover] = useState(null);
  const max = Math.max(0, ...rows.map((r) => r.value));
  const { top, ticks } = niceScale(max);
  const best = rows.reduce((b, r, i) => (r.value > (rows[b]?.value ?? -1) ? i : b), 0);

  return (
    <div className="scale-chart" style={{ '--chart-h': `${height}px` }}>
      <div className="scale-yaxis" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} style={{ bottom: `calc(22px + (100% - 22px) * ${t / top})` }}>{short(t)}</span>
        ))}
      </div>
      <div className="scale-plot" onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <div key={t} className="scale-grid" style={{ bottom: `calc(22px + (100% - 22px) * ${t / top})` }} />
        ))}
        <div className="scale-bars">
          {rows.map((row, i) => (
            <div
              key={row.key}
              className={`scale-bar-slot${hover === i ? ' is-hover' : ''}`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              tabIndex={0}
              aria-label={`${row.label}: ${money(row.value)}`}
            >
              {row.value > 0 && i === best && <span className="scale-bar-value">{short(row.value)}</span>}
              <div className="scale-bar" style={{ height: `${top ? (row.value / top) * 100 : 0}%` }} />
              <span className="scale-xlabel">{i % labelEvery === 0 || i === rows.length - 1 ? row.label : ''}</span>
            </div>
          ))}
        </div>
        {hover !== null && rows[hover] && (
          <div
            className="scale-tooltip"
            style={{ left: `${((hover + 0.5) / rows.length) * 100}%` }}
          >
            <strong>{rows[hover].full || rows[hover].label}</strong>
            <span>{money(rows[hover].value)}</span>
            {rows[hover].note && <span className="scale-tooltip-note">{rows[hover].note}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

// Horizontal bars for named groups (collections)
const HBarChart = ({ rows }) => {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="scale-hbars">
      {rows.map((row) => (
        <div className="scale-hbar-row" key={row.key} title={`${row.label}: ${money(row.value)}`}>
          <span className="scale-hbar-label">{row.label}</span>
          <span className="scale-hbar-track">
            <span className="scale-hbar" style={{ width: `${Math.max(1, (row.value / max) * 100)}%` }} />
          </span>
          <span className="scale-hbar-value">{money(row.value)}</span>
        </div>
      ))}
    </div>
  );
};

const AdminScale = ({ request }) => {
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), now.getMonth() - 11, 1);
    const monthAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29);
    Promise.all([
      request(`/admin/reports?from=${dayString(yearStart)}&to=${dayString(now)}`),
      request(`/admin/reports?from=${dayString(monthAgo)}&to=${dayString(now)}`)
    ])
      .then(([y, m]) => {
        if (!cancelled) {
          setYear(y);
          setMonth(m);
        }
      })
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [request]);

  // Every one of the last 12 months, including months with no sales
  const monthRows = useMemo(() => {
    if (!year) return [];
    const byMonth = Object.fromEntries(year.monthly.map((m) => [m.month, m]));
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
      const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
      const m = byMonth[key];
      return {
        key,
        label: d.toLocaleDateString('en-PK', { month: 'short' }),
        full: d.toLocaleDateString('en-PK', { month: 'long', year: 'numeric' }),
        value: m ? m.revenue : 0,
        orders: m ? m.orders : 0,
        items: m ? m.items : 0,
        note: m ? `${m.orders} orders · ${m.items} pieces` : 'No sales'
      };
    });
  }, [year]);

  // Every one of the last 30 days
  const dayRows = useMemo(() => {
    if (!month) return [];
    const byDay = Object.fromEntries(month.daily.map((d) => [d.day, d]));
    const now = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29 + i);
      const key = dayString(d);
      const row = byDay[key];
      return {
        key,
        label: String(d.getDate()),
        full: d.toLocaleDateString('en-PK', { weekday: 'short', day: 'numeric', month: 'short' }),
        value: row ? row.revenue : 0,
        note: row ? `${row.orders} orders` : 'No sales'
      };
    });
  }, [month]);

  const collectionRows = (year?.byCollection || []).map((c) => ({ key: c.collection, label: c.collection, value: c.revenue }));
  const bestMonth = monthRows.reduce((b, r) => (r.value > (b?.value ?? 0) ? r : b), null);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <p className="admin-eyebrow">Admin Dashboard</p>
          <h1>Scale</h1>
          <p className="admin-subtitle">Sales month by month, day by day and by collection · cancelled orders not counted</p>
        </div>
      </div>

      {error && <p className="admin-error">{error}</p>}
      {!year && !error && <p className="admin-muted">Loading charts…</p>}

      {year && (
        <>
          <div className="admin-summary">
            <div>
              <span>Last 12 months</span>
              <strong>{money(year.summary.revenue)}</strong>
            </div>
            <div>
              <span>Orders</span>
              <strong>{year.summary.orders}</strong>
            </div>
            <div>
              <span>Best month</span>
              <strong>{bestMonth ? bestMonth.full : '-'}</strong>
            </div>
            <div>
              <span>Last 30 days</span>
              <strong>{money(month?.summary.revenue)}</strong>
            </div>
          </div>

          <div className="report-card scale-card">
            <h3>Month-wise sales <span className="admin-muted">· last 12 months</span></h3>
            <BarChart rows={monthRows} />
            <details className="scale-table">
              <summary>Show as table</summary>
              <table className="admin-items">
                <thead>
                  <tr><th>Month</th><th>Orders</th><th>Pieces</th><th>Sales</th></tr>
                </thead>
                <tbody>
                  {[...monthRows].reverse().map((r) => (
                    <tr key={r.key}>
                      <td>{r.full}</td>
                      <td>{r.orders}</td>
                      <td>{r.items}</td>
                      <td>{money(r.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </div>

          <div className="report-grid">
            <div className="report-card scale-card">
              <h3>Day-wise sales <span className="admin-muted">· last 30 days</span></h3>
              <BarChart rows={dayRows} height={200} labelEvery={5} />
            </div>
            <div className="report-card scale-card">
              <h3>Sales by collection <span className="admin-muted">· last 12 months</span></h3>
              {collectionRows.length ? <HBarChart rows={collectionRows} /> : <p className="admin-muted">No sales yet.</p>}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminScale;
