import { createAction } from 'redux-actions';
import StoreBookmark from 'data/StoreBookmark';
import StoreList from 'data/StoreList';
import StoreUI from 'data/StoreUI';

const SET_MAIN = 'SET_MAIN';

const createBookmark = (id, titleBookmark) => {
  let uuid = id;
  let list = StoreBookmark.getValue('list');
  let title = '';
  if (!uuid) {
    // init setting bookmark & list...
    uuid = +new Date();
    title = list.length === 0 ? 'Bookmark' : titleBookmark;
    const item = StoreBookmark.addItem({ uuid, title });
    StoreBookmark.setValues({ list: [item, ...list], uuid });
  } else {
    const idx = list.findIndex(bookmark => bookmark.uuid === id);
    const { title: titleSelected } = list[idx];
    title =  titleBookmark || titleSelected;
    list[idx].title = title;
    StoreBookmark.setValues({ list, uuid });

  }
  StoreList.init(uuid);
  list = StoreBookmark.getValue('list');
  uuid = StoreBookmark.getValue('uuid');
  return uuid;
}

StoreBookmark.init('bookmark');
const id = StoreBookmark.getValue('uuid');
const bookmarkIdInit  = createBookmark(id);
StoreUI.init('ui');


export const setMain = createAction(SET_MAIN);

const initialState = {
  winMode: StoreUI.getValue('winMode'),
  isDrawerOpen: false,
  videoId: StoreList.getValue('videoId'),
  bookmarkId: bookmarkIdInit,
  isAddToList: false,
  loopType: "SINGLE",
  listBookmark: StoreBookmark.getValue('list'),
  listVideo: StoreList.getValue('list'),
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
export const playVideo = ({ videoId }) => (dispatch) => {
  dispatch(setMain({ videoId }));
};

export const playNextVideo = () => (dispatch, getState) => {
  const { mainUI: { videoId, listVideo } } = getState();
  let idx = findIndexVideo(videoId, listVideo);
  idx = (idx < listVideo.length -1) ? idx +1 : 0;
  const { videoId: nextVideoId } = listVideo[idx];
  dispatch(playVideo({ videoId: nextVideoId }));
};
export const saveBookmarkTitle = (title) => (dispatch) => {
  const uuid = StoreList.getValue('uuid');
  const listBookmark = StoreBookmark.getValue('list');
  const idx = listBookmark.findIndex(bookmark => bookmark.uuid === uuid);
  listBookmark[idx].title = title;
  StoreBookmark.setValue('list', listBookmark);
  dispatch(setMain({ listBookmark }));
}
export const addBookmarkTitle = (titleBookmark) => (dispatch) => {
  const bookmarkId = createBookmark(null, titleBookmark);
  dispatch(setMain({
    listBookmark: StoreBookmark.getValue('list'),
    listVideo: StoreList.getValue('list'),
    videoId: StoreList.getValue('videoId'),
    bookmarkId,
  }));
};
export const removeBookmark = ({ uuid }) => (dispatch, getState) => {
  const { mainUI: { listBookmark, bookmarkId } } = getState();
  const listBookmarkNext = listBookmark.filter(bookmark => bookmark.uuid !== uuid);
  const lg = listBookmarkNext.length;
  if (lg > 0 && bookmarkId !== uuid) {
    StoreBookmark.setValue('list', listBookmarkNext);
    dispatch(setMain({
      listBookmark: listBookmarkNext,
      bookmarkId: bookmarkId === uuid ? null : bookmarkId,
    }))
    StoreList.deleteList(uuid);
  } else {
    console.log('at least one remained');
  }
};
export const playBookmark =({ uuid }) => (dispatch) => {
  const bookmarkId = createBookmark(uuid);
  const listVideo = StoreList.getValue('list');
  let videoId = StoreList.getValue('videoId');
  if (!videoId && listVideo.length > 0) {
    const { videoId: vId } = listVideo[0];
    videoId = vId;
  }
  dispatch(setMain({
    videoId,
    listVideo,
    bookmarkId,
  }));
};
export const addVideoToList = ({
  videoId,
  author,
  title,
  duration,
}) => (dispatch, getState) => {
  // if (!videoId) {
  //   dispatch(setMain({ videoId, isAddToList: false }));
  //   return;
  // }
  const { mainUI: { listVideo } } = getState();
  const isExist = listVideo.findIndex(item => item.id === videoId) !== -1;
  if (!isExist) {
    const update = [StoreList.addItem({
        videoId,
        author,
        title,
        duration,
      }), ...listVideo];
    StoreList.setValue('list', update);
    dispatch(setMain({
      listVideo: update,
      isAddToList: false,
    }));
    console.log('pppppppppppppppppp');
  } else {
    dispatch(setMain({ videoId, isAddToList: false }));
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
