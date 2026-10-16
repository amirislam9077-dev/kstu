import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

// Floating "Back to Admin" button on the website, shown only after the admin
// opened the site with "View website" from the admin panel, in that tab only.
// A normal visit (new tab, typed address, customers) never shows it.
export const ADMIN_VIEW_KEY = 'adminViewingSite';

// Older versions kept this for the whole browser; clear that leftover once
try {
  window.localStorage.removeItem(ADMIN_VIEW_KEY);
} catch (error) {
  // storage blocked
}

export const markAdminViewing = (on) => {
  try {
    if (on) {
      window.sessionStorage.setItem(ADMIN_VIEW_KEY, '1');
    } else {
      window.sessionStorage.removeItem(ADMIN_VIEW_KEY);
    }
  } catch (error) {
    // storage blocked: the button just won't show
  }
};

const isAdminViewing = () => {
  try {
    return window.sessionStorage.getItem(ADMIN_VIEW_KEY) === '1';
  } catch (error) {
    return false;
  }
};

const AdminReturnButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [show, setShow] = useState(isAdminViewing);

  useEffect(() => {
    setShow(isAdminViewing());
  }, [location.pathname]);

  if (!show || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <button type="button" className="admin-return" onClick={() => navigate('/admin/orders')}>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
      Back to Admin
    </button>
  );
};

export default AdminReturnButton;
