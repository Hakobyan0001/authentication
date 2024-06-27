const addItem = (key: string, item: any) => {
  sessionStorage.setItem(key, JSON.stringify(item));
};

const deleteItem = (key: string) => {
  sessionStorage.removeItem(key);
};

const getItem = (key: string) => {
  return sessionStorage.getItem(key);
};

const clear = () => {
  sessionStorage.clear();
};

const sesStorage = {
  addItem,
  deleteItem,
  getItem,
  clear
};

export default sesStorage;
