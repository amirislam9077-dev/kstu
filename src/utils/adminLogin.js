// Admin login (email + password), kept in this browser until "Log out", so it
// is asked only once. The Khurram Studio Accounts app uses the same login:
// a tab opened from one app asks the app that opened it, so it opens directly.

// Khurram Studio accounts app
export const ACCOUNTS_URL = process.env.REACT_APP_ACCOUNTS_URL || 'https://shopaccount-one.vercel.app';
const ACCOUNTS_ORIGIN = (() => {
  try {
    return new URL(ACCOUNTS_URL).origin;
  } catch (error) {
    return '';
  }
})();

const KEY_STORAGE = 'adminOrdersKey';

const clean = (value) => (value && value.email && value.password ? { email: value.email, password: value.password } : null);

export const readLogin = () => {
  try {
    const saved = window.localStorage.getItem(KEY_STORAGE) || window.sessionStorage.getItem(KEY_STORAGE);
    return clean(JSON.parse(saved || 'null'));
  } catch (error) {
    return null;
  }
};

export const saveLogin = (value) => {
  try {
    window.sessionStorage.removeItem(KEY_STORAGE); // older versions kept it per tab
    if (value) {
      window.localStorage.setItem(KEY_STORAGE, JSON.stringify(clean(value)));
    } else {
      window.localStorage.removeItem(KEY_STORAGE);
    }
  } catch (error) {
    // storage blocked; the login just won't survive a reload
  }
};

// The accounts app (in a tab this site opened, or that opened this one) asks
// for the login: answer only that exact site, and only when logged in here.
if (typeof window !== 'undefined' && ACCOUNTS_ORIGIN) {
  window.addEventListener('message', (event) => {
    if (event.origin !== ACCOUNTS_ORIGIN || !event.source || event.data?.type !== 'ks-login-request') return;
    const login = readLogin();
    if (login) {
      event.source.postMessage({ type: 'ks-login', ...login }, event.origin);
    }
  });
}

// Not logged in here: ask the accounts tab that opened this one.
// Calls onLogin(login) if it answers; returns a cleanup function.
// Used once per page load, so a wrong login shows the login form instead of looping.
let askedOpener = false;
export const askOpenerForLogin = (onLogin) => {
  if (askedOpener || !ACCOUNTS_ORIGIN || !window.opener) return () => {};
  const listener = (event) => {
    if (event.origin !== ACCOUNTS_ORIGIN || event.data?.type !== 'ks-login') return;
    const login = clean(event.data);
    if (!login || askedOpener) return;
    askedOpener = true;
    onLogin(login);
  };
  window.addEventListener('message', listener);
  try {
    window.opener.postMessage({ type: 'ks-login-request' }, ACCOUNTS_ORIGIN);
  } catch (error) {
    // opener gone
  }
  return () => window.removeEventListener('message', listener);
};
