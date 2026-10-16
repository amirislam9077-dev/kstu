import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

// Floating "Back to Admin" button on the website, shown only after the admin
// opened the site with "View website" from the admin panel.
export const ADMIN_VIEW_KEY = 'adminViewingSite';

export const markAdminViewing = (on) => {
  try {
    if (on) {
      window.localStorage.setItem(ADMIN_VIEW_KEY, '1');
    } else {
      window.localStorage.removeItem(ADMIN_VIEW_KEY);
    }
  } catch (error) {
    // storage blocked: the button just won't show
  }
};

const isAdminViewing = () => {
  try {
    return window.localStorage.getItem(ADMIN_VIEW_KEY) === '1';
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
    <div className="admin-return">
      <button type="button" className="admin-return-btn" onClick={() => navigate('/admin/orders')}>
        ← Admin Panel
      </button>
      <button
        type="button"
        className="admin-return-close"
        aria-label="Hide"
        title="Hide"
        onClick={() => {
          markAdminViewing(false);
          setShow(false);
        }}
      >
        ×
      </button>
    </div>
  );
};

export default AdminReturnButton;
