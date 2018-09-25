export default class StoreBasic {
  static getValue(key) {
    return this.data.get(key);
  }

  static setValue(key, v) {
    this.data.set(key, v);
  }
}
