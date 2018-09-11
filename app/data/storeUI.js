import Store from 'electron-store';

export default class StoreUI {
  static changeStore(name) {
    this.storeUI = new Store({ name });  
  }
  static getStoreUI(key) {
    return this.storeUI.get(key);
  }

  static setStoreUI(key, v) {
    this.storeUI.set(key, v);
  }
}
