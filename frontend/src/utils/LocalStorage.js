export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
