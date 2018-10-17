import Store from 'electron-store';
import StoreBasic from './StoreBasic';

export default class StoreBookmark extends StoreBasic {
  constructor(props) {
    super(props);
    this.data = null;
  }
  static init(title) {
    this.data = new Store({
      name: title,
      defaults: {
        uuid: null,
        list: [],
      },
    });
  }
  static addItem({
    uuid,
    title,
  }) {
    return {
      uuid,
      title,
    }
  }
  // static clearStoreBookmark() {
  //   this.data.clear();
  //   return [];
  // }
}
