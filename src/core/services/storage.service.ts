export const STORAGE_KEYS = {
  USER: "user",
  RECENT_BOARDS: "recentBoards",
} as const;

export class StorageService {
  get<T = any>(key): T {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      // @ts-ignore
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
