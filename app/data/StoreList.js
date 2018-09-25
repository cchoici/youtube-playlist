import Store from 'electron-store';
import StoreBasic from './StoreBasic';

export default class StoreList extends StoreBasic {
  constructor(props) {
    super(props);
    this.data = null;
  }
  static changeStore(name) {
    this.data = new Store({
      name,
      defaults: {
        title: '',
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
      isPlay: true,
    }
  }
  static clearStoreList() {
    this.storeList.clear();
    return [];
  }
}
