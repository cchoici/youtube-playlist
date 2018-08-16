import Store from 'electron-store';

const storeList = new Store({
  name: 'videoList',
  defaults: {
    videoId: null,
    list: [],
  },
});

export const addVideoItem = ({
  videoId,
  title,
  author,
}) => ({
  id: videoId,
  videoId,
  title,
  author,
  isPlay: true,
})


export const getStoreList = (key) => storeList.get(key);

export const setStoreList = (key, arr) => {
  storeList.set(key, arr);
};

export const clearStoreList = () => {
  storeList.clear();
  return [];
}

