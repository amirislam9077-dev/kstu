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

// After "Log out" this tab must not log itself back in from the accounts app
const NO_AUTO_LOGIN = 'ksNoAutoLogin';
const setNoAutoLogin = (on) => {
  try {
    if (on) window.sessionStorage.setItem(NO_AUTO_LOGIN, '1');
    else window.sessionStorage.removeItem(NO_AUTO_LOGIN);
  } catch (error) {
    // storage blocked
  }
};
const noAutoLogin = () => {
  try {
    return window.sessionStorage.getItem(NO_AUTO_LOGIN) === '1';
  } catch (error) {
    return false;
  }
};

// Typed in by hand: auto login from the accounts app may be used again later
export const loggedInByHand = () => setNoAutoLogin(false);

// Accounts tabs opened from here (they are told about a log out too)
const openedTabs = [];
export const openAccounts = (url = ACCOUNTS_URL) => {
  const tab = window.open(url, '_blank');
  if (tab) openedTabs.push(tab);
};

let onLoggedOut = () => {};
export const setLoggedOutHandler = (fn) => {
  onLoggedOut = fn;
};

// "Log out": forget the login here, and log out the connected accounts tabs too
export const logOutEverywhere = () => {
  saveLogin(null);
  setNoAutoLogin(true);
  [window.opener, ...openedTabs].forEach((tab) => {
    try {
      if (tab && !tab.closed) tab.postMessage({ type: 'ks-logout' }, ACCOUNTS_ORIGIN);
    } catch (error) {
      // tab gone or on another site
    }
  });
};

// The accounts app (in a tab this site opened, or that opened this one) asks
// for the login, or says it logged out: listen only to that exact site.
if (typeof window !== 'undefined' && ACCOUNTS_ORIGIN) {
  window.addEventListener('message', (event) => {
    if (event.origin !== ACCOUNTS_ORIGIN || !event.source) return;
    if (event.data?.type === 'ks-logout') {
      saveLogin(null);
      setNoAutoLogin(true);
      onLoggedOut();
      return;
    }
    if (event.data?.type !== 'ks-login-request') return;
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
  if (askedOpener || noAutoLogin() || !ACCOUNTS_ORIGIN || !window.opener) return () => {};
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
