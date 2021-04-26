import { STORAGE_KEYS } from "../core/services/storage.service";

export const createQueryParams = (obj) => {
  const queryParams = new URLSearchParams(obj);
  queryParams.forEach((value, key) => {
    if (value === 'undefined') {
      queryParams.delete(key);
    }
  });
  return queryParams.toString();
};


export const parseResponse = <T>(responsePromise) =>
  new Promise<T>((resolve, reject) => {
    responsePromise
      .then((response: Response) => {
        if (response.status === 401) {
          localStorage.removeItem(STORAGE_KEYS.USER);
          return window.location.href = '/login';
        }
        return response.json();
      })
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });

