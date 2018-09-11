import Store from 'electron-store';




export const addVideoItem = ({
  videoId,
  title,
  author,
  duration,
}) => ({
  id: videoId,
  videoId,
  title,
  author,
  duration,
  isPlay: true,
});

export default class StoreList {
  constructor() {
    this.storeList = null;
  }
  static changeStore(name) {
    this.storeList = new Store({
      name,
      defaults: {
        title: '',
        videoId: null,
        list: [],
      },
    });
  }

  static getStoreList(key) {
    return this.storeList.get(key);
  }

  static setStoreList(key, arr) {
    this.storeList.set(key, arr);
  }

  static clearStoreList() {
    this.storeList.clear();
    return [];
  }
}
