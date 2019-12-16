import AsyncStorage from '@react-native-community/async-storage';

const COOKIE_STORAGE_KEY = 'cookies';

export class CookieStorage {
  cookie = null;

  setCookie = async cookie => {
    this.cookie = cookie;
    if (__DEV__) console.info('Storage.setCookie =>', cookie);
    await AsyncStorage.setItem(COOKIE_STORAGE_KEY, this.cookie);
    return true;
  };

  getCookie = async () => {
    if (this.cookie) return this.cookie;
    this.cookie = await AsyncStorage.getItem(COOKIE_STORAGE_KEY)
    if (__DEV__) console.info('Storage.getCookie =>', this.cookie);
    return this.cookie;
  };

  clearCookie = async () => {
    this.cookies = null;
    await AsyncStorage.removeItem(COOKIE_STORAGE_KEY);
    if (__DEV__) console.info('Storage.clearCookie');
    return true;
  };
}

export default new CookieStorage();
