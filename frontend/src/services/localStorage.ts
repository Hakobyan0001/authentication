const addItem = (key: string, item: unknown) => {
  localStorage.setItem(key, JSON.stringify(item));
};

const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

const getItem = (key: string) => {
  return localStorage.getItem(key);
};

const clear = () => {
  localStorage.clear();
};

const locStorage = {
  addItem,
  deleteItem,
  getItem,
  clear
};

export default locStorage;
