export default class StoreBasic {
  static getValue(key) {
    return this.data.get(key);
  }

  static setValue(key, v) {
    this.data.set(key, v);
  }
  static setValues(obj) {
    Object.entries(obj).forEach(([key, v]) => {
      this.data.set(key, v);
    });
  }
  static hasValue(key) {
    return this.data.has(key);
  }
}
