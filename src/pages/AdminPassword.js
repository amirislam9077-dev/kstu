import React, { useState } from 'react';
import { BACKEND_URL } from '../utils/api';

// "Change password" and "Forgot password" for the admin login screen.
// The same password also opens the Khurram Studio Accounts app.
const post = async (path, body) => {
  let response;
  try {
    response = await fetch(`${BACKEND_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  } catch (err) {
    throw new Error('The server is not responding. It may be waking up — please wait a minute and try again.');
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || `Request failed (${response.status}).`);
  return data;
};

const AdminPassword = ({ mode, initialEmail = '', onBack, onChanged }) => {
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const run = async (task) => {
    setBusy(true);
    setError('');
    try {
      await task();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const checkNew = () => {
    if (newPassword.length < 6) throw new Error('The new password must be at least 6 characters.');
    if (newPassword !== confirmPassword) throw new Error('The two new passwords are not the same.');
  };

  const changePassword = (event) => {
    event.preventDefault();
    run(async () => {
      if (!email.trim() || !currentPassword) throw new Error('Enter your email and current password.');
      checkNew();
      await post('/admin/password/change', { email: email.trim(), currentPassword, newPassword });
      onChanged({ email: email.trim(), password: newPassword }, 'Password changed.');
    });
  };

  const sendCode = (event) => {
    event.preventDefault();
    run(async () => {
      if (!email.trim()) throw new Error('Enter the admin email.');
      const data = await post('/admin/password/forgot', { email: email.trim() });
      setCodeSent(true);
      setNote(data.message);
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();
    run(async () => {
      if (!/^\d{6}$/.test(code.trim())) throw new Error('Enter the 6-digit code from the email.');
      checkNew();
      await post('/admin/password/reset', { email: email.trim(), code: code.trim(), newPassword });
      onChanged({ email: email.trim(), password: newPassword }, 'Password changed.');
    });
  };

  const newPasswordFields = (
    <>
      <input
        type="password"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        placeholder="New password (at least 6 characters)"
        autoComplete="new-password"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        placeholder="New password again"
        autoComplete="new-password"
      />
    </>
  );

  const footer = (label) => (
    <>
      {error && <p className="admin-error">{error}</p>}
      <button type="submit" disabled={busy}>{busy ? 'Please wait…' : label}</button>
      <button type="button" className="admin-login-link" onClick={onBack}>← Back to log in</button>
    </>
  );

  if (mode === 'change') {
    return (
      <form className="admin-login-card" onSubmit={changePassword}>
        <h1>Change Password</h1>
        <p>The new password also opens Khurram Studio Accounts.</p>
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" autoComplete="username" />
        <input
          type="password"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          placeholder="Current password"
          autoComplete="current-password"
        />
        {newPasswordFields}
        {footer('Change password')}
      </form>
    );
  }

  if (!codeSent) {
    return (
      <form className="admin-login-card" onSubmit={sendCode}>
        <h1>Forgot Password</h1>
        <p>Enter the admin email. A 6-digit code will be emailed to it.</p>
        <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" autoComplete="username" autoFocus />
        {footer('Send code')}
      </form>
    );
  }

  return (
    <form className="admin-login-card" onSubmit={resetPassword}>
      <h1>New Password</h1>
      {note && <p className="admin-login-note">{note}</p>}
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        value={code}
        onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
        placeholder="6-digit code from the email"
        autoComplete="one-time-code"
        autoFocus
      />
      {newPasswordFields}
      {footer('Save new password')}
      <button type="button" className="admin-login-link" disabled={busy} onClick={sendCode}>Send the code again</button>
    </form>
  );
};

export default AdminPassword;
