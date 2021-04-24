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
      .then((response) => {
        if (response.status === 401) {
          alert('Invalid Token');
        }
        return response.json();
      })
      .then((r) => resolve(r))
      .catch((e) => reject(e));
  });

