export const STORAGE_KEYS = {
  USER: 'user',
}

export class StorageService {
  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      return localStorage.getItem(key);
    }
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  delete(key) {
    localStorage.removeItem(key);
  }
}
