export const storage = {
  update: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
    return JSON.parse(localStorage.getItem(name));
  },
  set: (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
    return JSON.parse(localStorage.getItem(name));
  },
  get: (name) => {
    return JSON.parse(localStorage.getItem(name));
  },
  remove: (name) => {
    localStorage.removeItem(name);
  },
};
