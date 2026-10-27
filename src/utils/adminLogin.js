// Admin login (email + password), kept in this browser until "Log out".
// Switching between this admin and the Khurram Studio Accounts app always asks
// for the login again: the app you leave forgets it, and the app you open from
// the other one asks for it.

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

// Came here from the accounts app: ask for the login again
const cameFromAccounts = () => {
  try {
    return Boolean(ACCOUNTS_ORIGIN) && new URL(document.referrer).origin === ACCOUNTS_ORIGIN;
  } catch (error) {
    return false;
  }
};
if (typeof window !== 'undefined' && cameFromAccounts()) {
  saveLogin(null);
}

let onLoggedOut = () => {};
export const setLoggedOutHandler = (fn) => {
  onLoggedOut = fn;
};

// Accounts tabs opened from here (they are told about a log out too)
const openedTabs = [];
// Going to the accounts app logs this admin out, so coming back asks again
export const openAccounts = (url = ACCOUNTS_URL) => {
  const tab = window.open(url, '_blank');
  if (tab) openedTabs.push(tab);
  saveLogin(null);
  onLoggedOut();
};

// "Log out": forget the login here, and log out the connected accounts tabs too
export const logOutEverywhere = () => {
  saveLogin(null);
  [window.opener, ...openedTabs].forEach((tab) => {
    try {
      if (tab && !tab.closed) tab.postMessage({ type: 'ks-logout' }, ACCOUNTS_ORIGIN);
    } catch (error) {
      // tab gone or on another site
    }
  });
};

// The accounts app (in a tab this site opened, or that opened this one) says
// it logged out: listen only to that exact site.
if (typeof window !== 'undefined' && ACCOUNTS_ORIGIN) {
  window.addEventListener('message', (event) => {
    if (event.origin !== ACCOUNTS_ORIGIN || event.data?.type !== 'ks-logout') return;
    saveLogin(null);
    onLoggedOut();
  });
}
