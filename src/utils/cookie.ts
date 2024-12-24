import Cookies from 'js-cookie';

export function getCookie<T>(key: string): T | null {
  try {
    const value = Cookies.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (err) {
    console.error('Error reading cookie:', err);
    return null;
  }
}

export function setCookie<T>(key: string, value: T, options?: Cookies.CookieAttributes): void {
  try {
    const stringValue = JSON.stringify(value);
    Cookies.set(key, stringValue, options);
  } catch (err) {
    console.error('Error setting cookie:', err);
  }
}

export function removeCookie(key: string): void {
  try {
    Cookies.remove(key);
  } catch (err) {
    console.error('Error removing cookie:', err);
  }
} 