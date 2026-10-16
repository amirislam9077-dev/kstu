import React, { useEffect, useState } from 'react';
import { itemImage } from '../utils/productImages';

// Admin reports: sales summary, daily sales, top products, collections, cities.
// `section` picks which part is shown (from the sidebar).

const STATUS_LABELS = {
  new: 'New',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

const money = (value) => `Rs.${Math.round(Number(value) || 0).toLocaleString('en-PK')}`;

const Bar = ({ value, max }) => (
  <span className="report-bar">
    <span style={{ width: `${max > 0 ? Math.max(2, (value / max) * 100) : 0}%` }} />
  </span>
);

const AdminReports = ({ request, section }) => {
  const [range, setRange] = useState({ from: '', to: '' });
  const [applied, setApplied] = useState({ from: '', to: '' });
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    const params = new URLSearchParams(Object.entries(applied).filter(([, v]) => v));
    request(`/admin/reports?${params.toString()}`)
      .then((data) => !cancelled && setReport(data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [applied, request]);

  const titles = {
    sales: 'Sales Report',
    products: 'Top Products',
    collections: 'Sales by Collection',
    cities: 'Sales by City'
  };

  return (
    <>
      <div className="admin-topbar">
        <h1>{titles[section] || 'Reports'}</h1>
      </div>

      <form
        className="admin-filters"
        onSubmit={(event) => {
          event.preventDefault();
          setApplied(range);
        }}
      >
        <label>
          From
          <input type="date" value={range.from} onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))} />
        </label>
        <label>
          To
          <input type="date" value={range.to} onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))} />
        </label>
        <button type="submit" className="admin-btn-dark">Apply</button>
        <button
          type="button"
          className="admin-btn-light"
          onClick={() => {
            setRange({ from: '', to: '' });
            setApplied({ from: '', to: '' });
          }}
        >
          All time
        </button>
        {loading && <span className="admin-muted">Loading…</span>}
      </form>

      {error && <p className="admin-error">{error}</p>}

      {report && (
        <>
          <div className="admin-summary">
            <div>
              <span>Sales</span>
              <strong>{money(report.summary.revenue)}</strong>
            </div>
            <div>
              <span>Orders</span>
              <strong>{report.summary.orders}</strong>
            </div>
            <div>
              <span>Pieces sold</span>
              <strong>{report.summary.items}</strong>
            </div>
            <div>
              <span>Average order</span>
              <strong>{money(report.summary.average)}</strong>
            </div>
          </div>
          <p className="admin-muted report-note">Cancelled orders are not counted in sales.</p>

          {section === 'sales' && (
            <div className="report-grid">
              <div className="report-card">
                <h3>Orders by status</h3>
                <table className="admin-items">
                  <thead>
                    <tr><th>Status</th><th>Orders</th><th>Value</th></tr>
                  </thead>
                  <tbody>
                    {report.byStatus.map((row) => (
                      <tr key={row.status}>
                        <td><span className={`admin-status admin-status--${row.status}`}>{STATUS_LABELS[row.status] || row.status}</span></td>
                        <td>{row.orders}</td>
                        <td>{money(row.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="report-card">
                <h3>Daily sales</h3>
                <table className="admin-items">
                  <thead>
                    <tr><th>Day</th><th>Orders</th><th>Sales</th><th /></tr>
                  </thead>
                  <tbody>
                    {report.daily.length === 0 && (
                      <tr><td colSpan={4} className="admin-empty">No sales in this period.</td></tr>
                    )}
                    {report.daily.map((row) => (
                      <tr key={row.day}>
                        <td>{new Date(`${row.day}T00:00`).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        <td>{row.orders}</td>
                        <td>{money(row.revenue)}</td>
                        <td className="report-bar-cell"><Bar value={row.revenue} max={Math.max(...report.daily.map((d) => d.revenue))} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === 'products' && (
            <div className="report-card">
              <table className="admin-items">
                <thead>
                  <tr><th>#</th><th>Product</th><th>Pieces sold</th><th>Sales</th></tr>
                </thead>
                <tbody>
                  {report.topProducts.length === 0 && (
                    <tr><td colSpan={4} className="admin-empty">No sales in this period.</td></tr>
                  )}
                  {report.topProducts.map((row, index) => (
                    <tr key={row.title}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="admin-item">
                          {itemImage(row) ? (
                            <img className="admin-item-img" src={itemImage(row)} alt={row.title} loading="lazy" />
                          ) : (
                            <span className="admin-item-img" aria-hidden="true" />
                          )}
                          <div>
                            <div>{row.title}</div>
                            <div className="admin-muted">{[row.collection, row.sku].filter(Boolean).join(' · ')}</div>
                          </div>
                        </div>
                      </td>
                      <td>{row.quantity}</td>
                      <td>{money(row.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {(section === 'collections' || section === 'cities') && (
            <div className="report-card">
              <table className="admin-items">
                <thead>
                  <tr>
                    <th>{section === 'collections' ? 'Collection' : 'City'}</th>
                    <th>Orders</th>
                    {section === 'collections' && <th>Pieces</th>}
                    <th>Sales</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {(section === 'collections' ? report.byCollection : report.byCity).map((row, _, rows) => (
                    <tr key={row.collection || row.city}>
                      <td>{row.collection || row.city}</td>
                      <td>{row.orders}</td>
                      {section === 'collections' && <td>{row.quantity}</td>}
                      <td>{money(row.revenue)}</td>
                      <td className="report-bar-cell"><Bar value={row.revenue} max={Math.max(...rows.map((r) => r.revenue))} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminReports;
