import { connect } from 'react-redux';
// import { setMain } from '../modules/main';
import Player from '../components/Player';

export const mapStateToProps = ({ main: { videoId } }) => ({
  videoId
});

export const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);
