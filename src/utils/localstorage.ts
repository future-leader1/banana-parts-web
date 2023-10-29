export const LOCAL_STORAGE_KEY = {
  LOGIN_INFO: 'loginInfo',
  TOKEN: 'token',
  ADMIN_TOKEN: 'adminToken',
  ROLE: 'role',
  LANGUAGE: 'language',
  CURRENCY: 'currency',
};

export const getItemInLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  const item = localStorage.getItem(key);

  if (!item) {
    return null;
  }

  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
};

export const setItemInLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemInLocalStorage = (key: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(key);
};
