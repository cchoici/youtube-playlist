import Store from 'electron-store';

const storeUI = new Store({ name: 'ui' });

export const getStoreUI = (key) => storeUI.get(key);

export const setStoreUI = (key, v) => {
  storeUI.set(key, v);
};