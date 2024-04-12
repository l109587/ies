import { get, post } from '@/services/https';

export async function getToken() {
  return get('/login.php?action=token');
}
export async function getConfig(data = {}) {
  return post('/login.php?action=config', data);
}
export async function login(data = {}) {
  return post('/login.php?action=login', data);
}
export async function logout(data = {}) {
  return post('/login.php?action=logout', data);
}
export async function getAdminConf(data = {}) {
  return post('/cfg.php?controller=adminSet&action=showAdminConf', data);
}
export async function getMenuTree(data = {}) {
  return post('/cfg.php?controller=menu&action=menuTree', data);
}
export async function updatePasswd(data = {}) {
  return post('/cfg.php?controller=adminAcc&action=updatePasswd', data);
}
