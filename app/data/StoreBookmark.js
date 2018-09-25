import Store from 'electron-store';
import StoreBasic from './StoreBasic';

export default class StoreBookmark extends StoreBasic {
  constructor(props) {
    super(props);
    this.data = null;
  }
  static changeStore(name) {
    this.data = new Store({
      name,
      defaults: {
        id: null,
        list: [],
      },
    });
  }
  static addItem({
    id,
    title,
  }) {
    return {
      id,
      title,
    }
  }
  static clearStoreBookmark() {
    this.data.clear();
    return [];
  }
}
