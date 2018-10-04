import { createAction } from 'redux-actions';
import StoreBookmark from 'data/StoreBookmark';
import StoreList from 'data/StoreList';
import StoreUI from 'data/StoreUI';

const SET_MAIN = 'SET_MAIN';

const createBookmark = id => {
  let uuid = id;
  if (!uuid) {
    // init setting bookmark & list...
    const list = StoreBookmark.getValue('list');
    uuid = +new Date();
    const title = `Bookmark ${list.length + 1}`;
    const item = StoreBookmark.addItem({ uuid, title });
    StoreBookmark.setValues({ list: [item, ...list], uuid });
    StoreList.setValue('title', title);
  }
  StoreList.init(uuid);
}

StoreBookmark.init('bookmark');
const id = StoreBookmark.getValue('uuid');
createBookmark(id);
StoreUI.init('ui');


export const setMain = createAction(SET_MAIN);

const initialState = {
  winMode: StoreUI.getValue('winMode'),
  isDrawerOpen: false,
  videoId: StoreList.getValue('videoId'),
  isAddToList: false,
  loopType: "SINGLE",
  bookmarkList: StoreBookmark.getValue('list'),
  listTitle: StoreList.getValue('title'),
  listVideo: StoreList.getValue('list'),
  bookmarkTitle: 'Bookmark',
};
console.log('initialState:', initialState);

const findIndexVideo = (videoId, listVideo) => listVideo.findIndex(item => item.id === videoId);

export const triggerSetting = () => (dispatch, getState) => {
  const { mainUI: { isDrawerOpen } } = getState();
  dispatch(setMain({ isDrawerOpen: !isDrawerOpen }));
};

export const removeVideo = ({ videoId }) => (dispatch, getState) => {
  const { mainUI: { listVideo } } = getState();
  const idx = findIndexVideo(videoId, listVideo);
  listVideo.splice(idx, 1);
  dispatch(setMain({
    listVideo: listVideo.slice(0),
  }));
  
};
export const playVideo = ({ videoId }) => (dispatch, getState) => {
  const { mainUI: { listVideo } } = getState();
  const idx = findIndexVideo(videoId, listVideo);
  const list = listVideo.map((obj, i) => {
    const item = obj;
    item.isPlay = i === idx ? !false : false;
    return item;
  });
  list.slice(0);
  dispatch(setMain({
    videoId,
    listVideo: list,
  }));
};

export const playNextVideo = () => (dispatch, getState) => {
  const { mainUI: { videoId, listVideo } } = getState();
  let idx = findIndexVideo(videoId, listVideo);
  idx = (idx < listVideo.length -1) ? idx +1 : 0;
  const { videoId: nextVideoId } = listVideo[idx];
  dispatch(playVideo({ videoId: nextVideoId }));
};

export const addVideoToList = ({
  videoId,
  author,
  title,
  duration,
}) => (dispatch, getState) => {
  if (!videoId) {
    dispatch(setMain({ isAddToList: false }));
    return;
  }

  const { mainUI: { listVideo } } = getState();
  const isExist = listVideo.findIndex(item => item.id === videoId) !== -1;
  if (!isExist) {
    const list = listVideo.map(obj => {
      const item = obj;
      item.isPlay = false;
      return item;
    })
    dispatch(setMain({
      listVideo: [StoreList.addItem({
        videoId,
        author,
        title,
        duration,
      }), ...list],
      isAddToList: false,
    }));
  } else {
    const list = listVideo.map(obj => {
      const item = obj;
      item.isPlay = videoId === item.videoId ? !false : false;
      return item;
    })
    dispatch(setMain({ listVideo: list, isAddToList: false }));
  }
};
export const savePlayerData = () => (dispatch, getState) => {
  const { mainUI: { winMode, videoId, listVideo } } = getState();
  return new Promise((resolve) => {
    StoreUI.setValue('winMode', winMode);
    StoreList.setValue('videoId', videoId);
    StoreList.setValue('list', listVideo);
    resolve('save');
  })
};


const handlers = {
  [SET_MAIN]: (state, { payload }) => ({ ...state, ...payload }),
};

export const mainUIReducer = (state = initialState, action) => {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
};
