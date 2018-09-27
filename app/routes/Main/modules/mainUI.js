import { createAction } from 'redux-actions';
import StoreBookmark from '../../../data/StoreBookmark';
import StoreList from '../../../data/StoreList';
import StoreUI from '../../../data/StoreUI';

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
  videoList: StoreList.getValue('list'),
};

const findIndexVideo = (videoId, videoList) => videoList.findIndex(item => item.id === videoId);

export const triggerSetting = () => (dispatch, getState) => {
  const { mainUI: { isDrawerOpen } } = getState();
  dispatch(setMain({ isDrawerOpen: !isDrawerOpen }));
};

export const removeVideo = ({ videoId }) => (dispatch, getState) => {
  const { mainUI: { videoList } } = getState();
  const idx = findIndexVideo(videoId, videoList);
  videoList.splice(idx, 1);
  dispatch(setMain({
    videoList: videoList.slice(0),
  }));
  
};
export const playVideo = ({ videoId }) => (dispatch, getState) => {
  const { mainUI: { videoList } } = getState();
  const idx = findIndexVideo(videoId, videoList);
  const list = videoList.map((obj, i) => {
    const item = obj;
    item.isPlay = i === idx ? !false : false;
    return item;
  });
  list.slice(0);
  dispatch(setMain({
    videoId,
    videoList: list,
  }));
};

export const playNextVideo = () => (dispatch, getState) => {
  const { mainUI: { videoId, videoList } } = getState();
  let idx = findIndexVideo(videoId, videoList);
  idx = (idx < videoList.length -1) ? idx +1 : 0;
  const { videoId: nextVideoId } = videoList[idx];
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

  const { mainUI: { videoList } } = getState();
  const isExist = videoList.findIndex(item => item.id === videoId) !== -1;
  if (!isExist) {
    const list = videoList.map(obj => {
      const item = obj;
      item.isPlay = false;
      return item;
    })
    dispatch(setMain({
      videoList: [StoreList.addItem({
        videoId,
        author,
        title,
        duration,
      }), ...list],
      isAddToList: false,
    }));
  } else {
    const list = videoList.map(obj => {
      const item = obj;
      item.isPlay = videoId === item.videoId ? !false : false;
      return item;
    })
    dispatch(setMain({ videoList: list, isAddToList: false }));
  }
};
export const savePlayerData = () => (dispatch, getState) => {
  const { mainUI: { winMode, videoId, videoList } } = getState();
  return new Promise((resolve) => {
    StoreUI.setValue('winMode', winMode);
    StoreList.setValue('videoId', videoId);
    StoreList.setValue('list', videoList);
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
