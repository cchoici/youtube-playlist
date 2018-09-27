import { connect } from 'react-redux';
import { } from '../modules/mainUI';
import ListCollection from '../components/ListCollection';

export const mapStateToProps = ({
  mainUI: {
    winMode,
    videoList,
  },
}) => ({
  visible: winMode === 'NORMAL' ? !false : false,
  videoList,
});

export const mapDispatchToProps = () => ({
  // onLoopChange: (loopType) => {
  //   switch(loopType) {
  //     case 'SINGLE':
  //       dispatch(setMain({ loopType: 'ALL'}));
  //       break;
  //     default:
  //       dispatch(setMain({ loopType: 'SINGLE'}));
  //   }
  // },
  // onTriggerSetting: () => {
  //   dispatch(triggerSetting());
  // },
  // onDragEnd: (items) => {
  //   dispatch(setMain({ videoList: items }));
  // },
  // onRemoveVideo: ({ videoId }) => {
  //   dispatch(removeVideo({ videoId }));
  // },
  // onSwitchVideo: ({ videoId }) => {
  //   dispatch(playVideo({ videoId }));
  // },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCollection);
