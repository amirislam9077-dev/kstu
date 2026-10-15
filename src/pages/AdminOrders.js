import React, { useCallback, useEffect, useState } from 'react';
import { BACKEND_URL } from '../utils/api';
import AdminDiscounts from './AdminDiscounts';
import '../App.css';

// Admin page: lists saved orders from the MySQL database with filters, order
// details and status updates. The admin login is kept for this browser tab only.

const KEY_STORAGE = 'adminOrdersKey';
const STATUS_LABELS = {
  new: 'New',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};
const EMPTY_FILTERS = {
  search: '',
  status: '',
  city: '',
  collection: '',
  from: '',
  to: '',
  minTotal: '',
  maxTotal: '',
  sort: 'newest'
};

const formatMoney = (value) =>
  `Rs.${Number(value || 0).toLocaleString('en-PK', { maximumFractionDigits: 2 })}`;

const formatDate = (value) => {
  if (!value) {
    return '-';
  }
  const date = new Date(value.replace(' ', 'T'));
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString('en-PK', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const readLogin = () => {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(KEY_STORAGE) || 'null');
    return saved && saved.email && saved.password ? saved : null;
  } catch (error) {
    return null;
  }
};

const saveLogin = (value) => {
  try {
    if (value) {
      window.sessionStorage.setItem(KEY_STORAGE, JSON.stringify(value));
    } else {
      window.sessionStorage.removeItem(KEY_STORAGE);
    }
  } catch (error) {
    // storage blocked; the login just won't survive a reload
  }
};

// The slip needs the admin login headers, so it's fetched and shown from a local blob URL
const SlipImage = ({ orderId, login }) => {
  const [src, setSrc] = useState('');
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let url = '';
    let cancelled = false;
    fetch(`${BACKEND_URL}/admin/orders/${orderId}/slip`, {
      headers: { 'x-admin-email': login?.email || '', 'x-admin-key': login?.password || '' }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('slip');
        }
        return response.blob();
      })
      .then((blob) => {
        if (!cancelled) {
          url = URL.createObjectURL(blob);
          setSrc(url);
        }
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [orderId, login]);

  if (failed) {
    return <p className="admin-muted">The deposit slip could not be loaded.</p>;
  }
  if (!src) {
    return <p className="admin-muted">Loading deposit slip…</p>;
  }
  return (
    <a href={src} target="_blank" rel="noreferrer" className="admin-slip" title="Open full size">
      <img src={src} alt={`Deposit slip for order ${orderId}`} />
    </a>
  );
};

const AdminOrders = () => {
  const [login, setLogin] = useState(readLogin);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [slowServer, setSlowServer] = useState(false);

  // The free server sleeps when idle and takes up to ~1 minute to wake.
  // Start waking it as soon as this page opens.
  useEffect(() => {
    fetch(`${BACKEND_URL}/`).catch(() => {});
  }, []);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState({ cities: [], collections: [], statusCounts: {} });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openOrder, setOpenOrder] = useState(null);

  const request = useCallback(
    async (path, init = {}, credentials = login) => {
      const response = await fetch(`${BACKEND_URL}${path}`, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-email': credentials?.email || '',
          'x-admin-key': credentials?.password || '',
          ...(init.headers || {})
        }
      });
      let body = {};
      try {
        body = await response.json();
      } catch (parseError) {
        // empty or non-JSON reply; handled below
      }
      if (!response.ok) {
        const err = new Error(body.message || `Request failed (${response.status}).`);
        err.status = response.status;
        throw err;
      }
      return body;
    },
    [login]
  );

  const logOut = useCallback((message = '') => {
    saveLogin(null);
    setLogin(null);
    setData(null);
    setLoginError(message);
  }, []);

  const loadOrders = useCallback(async () => {
    if (!login) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page), pageSize: '20' });
      Object.entries(appliedFilters).forEach(([name, value]) => {
        if (value !== '') {
          params.set(name, value);
        }
      });
      const [list, filterOptions] = await Promise.all([
        request(`/admin/orders?${params.toString()}`),
        request('/admin/orders/filters')
      ]);
      setData(list);
      setOptions(filterOptions);
    } catch (err) {
      if (err.status === 401) {
        logOut('Wrong email or password.');
      } else {
        setError(err.message === 'Failed to fetch' ? `Can't reach the backend at ${BACKEND_URL}.` : err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [login, appliedFilters, logOut, page, request]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = { email: emailInput.trim(), password: passwordInput };
    if (!credentials.email || !credentials.password) {
      setLoginError('Enter your email and password.');
      return;
    }
    setLoginError('');
    setLoggingIn(true);
    const slowTimer = window.setTimeout(() => setSlowServer(true), 4000);
    try {
      // A sleeping server can drop the first request: try again a few times
      let lastError = null;
      for (let attempt = 0; attempt < 4; attempt += 1) {
        try {
          await request('/admin/orders/filters', {}, credentials);
          lastError = null;
          break;
        } catch (err) {
          lastError = err;
          if (err.status) break; // the server answered (e.g. wrong password): don't retry
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
      }
      if (lastError) throw lastError;
      saveLogin(credentials);
      setLogin(credentials);
      setPasswordInput('');
    } catch (err) {
      setLoginError(
        err.message === 'Failed to fetch'
          ? 'The server is not responding. Please wait a minute and try again.'
          : err.message
      );
    } finally {
      window.clearTimeout(slowTimer);
      setSlowServer(false);
      setLoggingIn(false);
    }
  };

  const updateFilter = (name) => (event) => setFilters((prev) => ({ ...prev, [name]: event.target.value }));

  const applyFilters = (event) => {
    event.preventDefault();
    setPage(1);
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setPage(1);
  };

  const showStatus = (status) => {
    const next = { ...filters, status };
    setFilters(next);
    setAppliedFilters(next);
    setPage(1);
  };

  const changeStatus = async (orderId, status) => {
    try {
      await request(`/admin/orders/${orderId}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
      setData((prev) => prev && {
        ...prev,
        orders: prev.orders.map((order) => (order.id === orderId ? { ...order, status } : order))
      });
      setOpenOrder((prev) => (prev && prev.id === orderId ? { ...prev, status } : prev));
      const filterOptions = await request('/admin/orders/filters');
      setOptions(filterOptions);
    } catch (err) {
      setError(err.message);
    }
  };

  const openDetails = async (orderId) => {
    try {
      setOpenOrder(await request(`/admin/orders/${orderId}`));
    } catch (err) {
      setError(err.message);
    }
  };

  if (!login) {
    return (
      <section className="admin-page admin-login">
        <form className="admin-login-card" onSubmit={handleLogin}>
          <h1>Orders Admin</h1>
          <p>Log in to see saved orders.</p>
          <input
            type="email"
            value={emailInput}
            onChange={(event) => setEmailInput(event.target.value)}
            placeholder="Email"
            autoComplete="username"
            autoFocus
          />
          <input
            type="password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
          {loginError && <p className="admin-error">{loginError}</p>}
          {slowServer && (
            <p className="admin-login-wait">The server is waking up — this can take up to a minute. Please wait…</p>
          )}
          <button type="submit" disabled={loggingIn}>
            {loggingIn ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </section>
    );
  }

  const statusCounts = options.statusCounts || {};
  const allCount = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

  return (
    <section className="admin-page">
      <div className="admin-topbar">
        <h1>Orders</h1>
        <div className="admin-topbar-actions">
          <button type="button" className="admin-btn-light" onClick={loadOrders} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
          <button type="button" className="admin-btn-light" onClick={() => logOut()}>
            Log out
          </button>
        </div>
      </div>

      <AdminDiscounts request={request} />

      <div className="admin-status-tabs">
        <button type="button" className={appliedFilters.status === '' ? 'active' : ''} onClick={() => showStatus('')}>
          All <span>{allCount}</span>
        </button>
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <button
            type="button"
            key={value}
            className={appliedFilters.status === value ? 'active' : ''}
            onClick={() => showStatus(value)}
          >
            {label} <span>{statusCounts[value] || 0}</span>
          </button>
        ))}
      </div>

      <form className="admin-filters" onSubmit={applyFilters}>
        <input
          className="admin-filter-search"
          type="search"
          placeholder="Search name, phone, email or order #"
          value={filters.search}
          onChange={updateFilter('search')}
        />
        <select value={filters.city} onChange={updateFilter('city')} aria-label="City">
          <option value="">All cities</option>
          {options.cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <select value={filters.collection} onChange={updateFilter('collection')} aria-label="Collection">
          <option value="">All collections</option>
          {options.collections.map((collection) => (
            <option key={collection} value={collection}>{collection}</option>
          ))}
        </select>
        <label>
          From
          <input type="date" value={filters.from} onChange={updateFilter('from')} />
        </label>
        <label>
          To
          <input type="date" value={filters.to} onChange={updateFilter('to')} />
        </label>
        <input type="number" min="0" placeholder="Min Rs." value={filters.minTotal} onChange={updateFilter('minTotal')} />
        <input type="number" min="0" placeholder="Max Rs." value={filters.maxTotal} onChange={updateFilter('maxTotal')} />
        <select value={filters.sort} onChange={updateFilter('sort')} aria-label="Sort">
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="highest">Highest total</option>
          <option value="lowest">Lowest total</option>
        </select>
        <button type="submit" className="admin-btn-dark">Apply</button>
        <button type="button" className="admin-btn-light" onClick={resetFilters}>Reset</button>
      </form>

      {error && <p className="admin-error">{error}</p>}

      {data && (
        <>
          <div className="admin-summary">
            <div>
              <span>Orders found</span>
              <strong>{data.total}</strong>
            </div>
            <div>
              <span>Total value</span>
              <strong>{formatMoney(data.revenue)}</strong>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>City</th>
                  <th>Items</th>
                  <th>Collections</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.orders.length === 0 && (
                  <tr>
                    <td colSpan={9} className="admin-empty">No orders match these filters.</td>
                  </tr>
                )}
                {data.orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>
                      <div className="admin-customer">{order.customer_name}</div>
                      <div className="admin-muted">{order.phone}</div>
                    </td>
                    <td>{order.city}</td>
                    <td>{order.item_count}</td>
                    <td className="admin-muted">{order.collections || '-'}</td>
                    <td className="admin-money">{formatMoney(order.subtotal)}</td>
                    <td>
                      <select
                        className={`admin-status admin-status--${order.status}`}
                        value={order.status}
                        onChange={(event) => changeStatus(order.id, event.target.value)}
                        aria-label={`Status of order ${order.id}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button type="button" className="admin-link" onClick={() => openDetails(order.id)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="admin-pagination">
            <button type="button" className="admin-btn-light" disabled={page <= 1} onClick={() => setPage(page - 1)}>
              ← Previous
            </button>
            <span>Page {data.page} of {data.pages}</span>
            <button
              type="button"
              className="admin-btn-light"
              disabled={page >= data.pages}
              onClick={() => setPage(page + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {openOrder && (
        <div className="admin-drawer-backdrop" onClick={() => setOpenOrder(null)} role="presentation">
          <aside className="admin-drawer" onClick={(event) => event.stopPropagation()} aria-label="Order details">
            <div className="admin-drawer-head">
              <h2>Order #{openOrder.id}</h2>
              <button type="button" className="admin-close" onClick={() => setOpenOrder(null)} aria-label="Close">
                ×
              </button>
            </div>
            <p className="admin-muted">{formatDate(openOrder.created_at)}</p>

            <dl className="admin-details">
              <dt>Name</dt>
              <dd>{openOrder.customer_name}</dd>
              <dt>Phone</dt>
              <dd><a href={`tel:${openOrder.phone}`}>{openOrder.phone}</a></dd>
              <dt>Email</dt>
              <dd><a href={`mailto:${openOrder.email}`}>{openOrder.email}</a></dd>
              <dt>Address</dt>
              <dd>{openOrder.address}, {openOrder.city}, {openOrder.country}</dd>
              {openOrder.remarks && (
                <>
                  <dt>Remarks</dt>
                  <dd>{openOrder.remarks}</dd>
                </>
              )}
              <dt>Status</dt>
              <dd>
                <select
                  className={`admin-status admin-status--${openOrder.status}`}
                  value={openOrder.status}
                  onChange={(event) => changeStatus(openOrder.id, event.target.value)}
                >
                  {Object.entries(STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </dd>
              <dt>Email sent</dt>
              <dd>{openOrder.email_sent ? 'Yes' : 'No'}</dd>
              <dt>Bank</dt>
              <dd>{openOrder.bank_name || '-'}</dd>
              <dt>Reference No</dt>
              <dd>{openOrder.reference_no || '-'}</dd>
            </dl>

            <h3>Deposit slip</h3>
            {openOrder.has_slip ? (
              <SlipImage orderId={openOrder.id} login={login} />
            ) : (
              <p className="admin-muted">No deposit slip attached.</p>
            )}

            <h3>Items</h3>
            <table className="admin-items">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {openOrder.items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div>{item.title}</div>
                      <div className="admin-muted">{[item.collection, item.sku].filter(Boolean).join(' · ')}</div>
                    </td>
                    <td>{item.size || '-'}</td>
                    <td>{item.quantity}</td>
                    <td>{formatMoney(item.unit_price)}</td>
                    <td>{formatMoney(item.line_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="admin-drawer-total">
              <span>Subtotal</span>
              <strong>{formatMoney(openOrder.subtotal)}</strong>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
};

export default AdminOrders;
