import Store from 'electron-store';

const storeList = new Store({
  name: 'videoList',
  defaults: {
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


export const getStoreList = () => storeList.get('list');

export const setStoreList = (arr) => {
  storeList.set('list', arr);
};

export const clearStoreList = () => {
  storeList.clear();
  return [];
}

