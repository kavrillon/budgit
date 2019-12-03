export const get = (url: string) => {
  return fetch(url).then(response => {
    if (!response.ok) return Promise.reject(response.statusText);

    const data = response.json();
    return Promise.resolve(data);
  });
};
