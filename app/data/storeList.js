import Store from 'electron-store';

const storeList = new Store({
  name: 'videoList',
  defaults: {
    list: [],
  },
});

export const addVideoItem = ({
  videoId,
}) => ({
  id: videoId,
  videoId,
  content: '',
})


export const getStoreList = () => storeList.get('list');

export const setStoreList = (arr) => {
  storeList.set('list', arr);
};

export const clearStoreList = () => {
  storeList.clear();
  return [];
}

