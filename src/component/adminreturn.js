import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

// Floating "Back to Admin" / "Back to Accounts" buttons on the website, shown
// only when the admin opened the site from the admin panel or from the
// Khurram Studio Accounts app, in that tab only.
// A normal visit (new tab, typed address, customers) never shows them.
export const ADMIN_VIEW_KEY = 'adminViewingSite';
const ACCOUNTS_VIEW_KEY = 'accountsViewingSite';

// Khurram Studio accounts app (its "Go to Website Page" opens the site with ?from=accounts)
export const ACCOUNTS_URL = process.env.REACT_APP_ACCOUNTS_URL || 'https://shopaccount-one.vercel.app';

// Older versions kept this for the whole browser; clear that leftover once
try {
  window.localStorage.removeItem(ADMIN_VIEW_KEY);
} catch (error) {
  // storage blocked
}

const setFlag = (key, on) => {
  try {
    if (on) {
      window.sessionStorage.setItem(key, '1');
    } else {
      window.sessionStorage.removeItem(key);
    }
  } catch (error) {
    // storage blocked: the button just won't show
  }
};

const hasFlag = (key) => {
  try {
    return window.sessionStorage.getItem(key) === '1';
  } catch (error) {
    return false;
  }
};

export const markAdminViewing = (on) => setFlag(ADMIN_VIEW_KEY, on);

// Opened from the accounts app: remember it for this tab and tidy the address
try {
  const params = new URLSearchParams(window.location.search);
  if (params.get('from') === 'accounts') {
    setFlag(ACCOUNTS_VIEW_KEY, true);
    params.delete('from');
    const query = params.toString();
    window.history.replaceState(window.history.state, '', window.location.pathname + (query ? `?${query}` : '') + window.location.hash);
  }
} catch (error) {
  // old browser: the button just won't show
}

const AdminReturnButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(() => hasFlag(ADMIN_VIEW_KEY));
  const [accounts, setAccounts] = useState(() => hasFlag(ACCOUNTS_VIEW_KEY));

  useEffect(() => {
    setAdmin(hasFlag(ADMIN_VIEW_KEY));
    setAccounts(hasFlag(ACCOUNTS_VIEW_KEY));
  }, [location.pathname]);

  if ((!admin && !accounts) || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="site-returns">
      {accounts && (
        <button type="button" className="admin-return" onClick={() => window.location.assign(ACCOUNTS_URL)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="3" width="16" height="18" rx="2" />
            <path d="M8 7h8M8 11h8M8 15h5" />
          </svg>
          Back to Accounts
        </button>
      )}
      {admin && (
        <button type="button" className="admin-return" onClick={() => navigate('/admin/orders')}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="9" rx="1.5" />
            <rect x="14" y="3" width="7" height="5" rx="1.5" />
            <rect x="14" y="12" width="7" height="9" rx="1.5" />
            <rect x="3" y="16" width="7" height="5" rx="1.5" />
          </svg>
          Back to Admin
        </button>
      )}
    </div>
  );
};

export default AdminReturnButton;
