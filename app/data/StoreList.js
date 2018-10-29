import Store from 'electron-store';
import StoreBasic from './StoreBasic';

export default class StoreList extends StoreBasic {
  constructor(props) {
    super(props);
    this.data = null;
  }
  static init(uuid) {
    this.data = new Store({
      name: uuid,
      defaults: {
        uuid,
        videoId: null,
        list: [],
      },
    });
  }

  static addItem({
    videoId,
    title,
    author,
    duration,
  }) {
    return {
      id: videoId,
      videoId,
      title,
      author,
      duration,
    }
  }
  // static clearStoreList() {
  //   this.storeList.clear();
  //   return [];
  // }
}
