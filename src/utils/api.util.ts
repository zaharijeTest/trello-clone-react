import { STORAGE_KEYS } from "../core/services/storage.service";

const AUTH_ERROR_CODES = [401, 429];

export const createQueryParams = (obj) => {
  const queryParams = new URLSearchParams(obj);
  queryParams.forEach((value, key) => {
    if (value === "undefined") {
      queryParams.delete(key);
    }
  });
  return queryParams.toString();
};

export const parseResponse = <T>(responsePromise) =>
  new Promise<T>((resolve, reject) => {
    responsePromise
      .then((response: Response) => {
        if (AUTH_ERROR_CODES.includes(response.status)) {
          localStorage.removeItem(STORAGE_KEYS.USER);
          return (window.location.href = "/login");
        }
        return response.json();
      })
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });
