export const loadData = (keyStorage) => {
  const data = JSON.parse(localStorage.getItem(keyStorage));
  if (data) {
    return data;
  } else {
    return null;
  }
};

export const saveData = (keyStorage, data) => {
  localStorage.setItem(keyStorage, JSON.stringify(data));
};
