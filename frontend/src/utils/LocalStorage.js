export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const getFromLocalStorage = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};
