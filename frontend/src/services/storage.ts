const addUser = (key: string, user: any) => {
  localStorage.setItem(key, JSON.stringify(user));
};

const deleteUser = (key: string) => {
  localStorage.removeItem(key);
};

const getUser = (key: string) => {
  return localStorage.getItem(key);
};

const clear = () => {
  localStorage.clear();
};

const storage = {
  addUser,
  deleteUser,
  getUser,
  clear
};

export default storage;
