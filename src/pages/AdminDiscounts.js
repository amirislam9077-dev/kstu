import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from '../utils/api';
import { setDiscountsCache } from '../utils/discounts';

// Admin: sale discount % for each collection page. 0 = no sale.
const COLLECTION_LABELS = {
  'new-arrival': 'New Arrival',
  sale: 'Sale',
  formal: 'Formal',
  bridal: 'Bridal',
  'wedding-formal': 'Wedding Formal',
  'ready-to-wear': 'Ready to Wear',
  unstitched: 'Unstitched',
  party: 'Party'
};

const AdminDiscounts = ({ request }) => {
  const [values, setValues] = useState(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  useEffect(() => {
    fetch(`${BACKEND_URL}/discounts`)
      .then((response) => response.json())
      .then((data) => setValues(Object.fromEntries(Object.keys(COLLECTION_LABELS).map((key) => [key, String(data[key] || 0)]))))
      .catch(() => setStatus({ state: 'error', message: 'Could not load discounts.' }));
  }, []);

  const save = async (event) => {
    event.preventDefault();
    setStatus({ state: 'saving', message: 'Saving…' });
    try {
      const payload = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value) || 0]));
      const saved = await request('/admin/discounts', { method: 'PUT', body: JSON.stringify({ discounts: payload }) });
      setValues(Object.fromEntries(Object.entries(saved).map(([key, value]) => [key, String(value)])));
      setDiscountsCache(saved);
      setStatus({ state: 'saved', message: 'Saved. The website shows the new prices now.' });
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  };

  if (!values) {
    return status.state === 'error' ? <p className="admin-error">{status.message}</p> : null;
  }

  return (
    <form className="admin-discounts" onSubmit={save}>
      <div className="admin-discounts-head">
        <h2>Sale discounts</h2>
        <p>Discount % for every product on each page. 0 = no discount.</p>
      </div>
      <div className="admin-discounts-grid">
        {Object.entries(COLLECTION_LABELS).map(([key, label]) => (
          <label key={key}>
            <span>{label}</span>
            <div className="admin-percent">
              <input
                type="number"
                min="0"
                max="90"
                step="1"
                value={values[key]}
                onChange={(event) => setValues((prev) => ({ ...prev, [key]: event.target.value }))}
              />
              <b>%</b>
            </div>
          </label>
        ))}
      </div>
      <div className="admin-discounts-foot">
        <button type="submit" className="admin-btn-dark" disabled={status.state === 'saving'}>
          {status.state === 'saving' ? 'Saving…' : 'Save discounts'}
        </button>
        {status.message && status.state !== 'saving' && (
          <span className={status.state === 'error' ? 'admin-discounts-error' : 'admin-discounts-ok'}>{status.message}</span>
        )}
      </div>
    </form>
  );
};

export default AdminDiscounts;
