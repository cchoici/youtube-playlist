import Store from 'electron-store';
import fs from 'fs';
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
  static deleteList(uuid) {
    StoreList.init(uuid);
    const filepath = this.data.path;
    if (fs.existsSync(filepath)) {
      fs.unlink(filepath, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("File succesfully deleted");
      });
    }
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
