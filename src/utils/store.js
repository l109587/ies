const APP_TOKEN = 'APP_USER_TOKEN';
const APP_USER_ID = 'APP_GLOBAL_USER_ID';
const APP_USERNAME = 'APP_GLOBAL_USERNAME';
const APP_ROLE = 'APP_GLOBAL_USER_ROLE';
const APP_THEME = 'APP_THEME';

export function setToken(val) {
  window.localStorage.setItem(APP_TOKEN, val);
}

export function getToken() {
  return window.localStorage.getItem(APP_TOKEN);
}
