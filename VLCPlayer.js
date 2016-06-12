import React from 'react';
import ReactNative from 'react-native';

const {
  Component,
  PropTypes,
} = React;

const {
  StyleSheet,
  requireNativeComponent,
  NativeModules,
  View,
} = ReactNative;

export default class VLCPlayer extends Component {

  constructor(props, context) {
    super(props, context);
    this.seek     = this.seek.bind(this);
    this.snapshot = this.snapshot.bind(this);
    this._assignRoot = this._assignRoot.bind(this);
    this._onError = this._onError.bind(this);
    this._onProgress = this._onProgress.bind(this);
    this._onEnded = this._onEnded.bind(this);
    this._onPlaying = this._onPlaying.bind(this);
    this._onStopped = this._onStopped.bind(this);
    this._onPaused = this._onPaused.bind(this);
    this._onBuffering = this._onBuffering.bind(this);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  seek(pos) {
    this.setNativeProps({ seek:  pos});
  }

  snapshot(path) {
    this.setNativeProps({ snapshotPath:  path});
  }

  _assignRoot(component) {
    this._root = component;
  }

  _onBuffering(event) {
    if (this.props.onBuffering) {
      this.props.onBuffering(event.nativeEvent);
    }
  }

  _onError(event) {
    if (this.props.onError) {
      this.props.onError(event.nativeEvent);
    }
  }

  _onProgress(event) {
    if (this.props.onProgress) {
      this.props.onProgress(event.nativeEvent);
    }
  }

  _onEnded(event) {
    if (this.props.onEnded) {
      this.props.onEnd(event.nativeEvent);
    }
  }

  _onStopped(event) {
    this.setNativeProps({ paused: true });
    if (this.props.onStopped) {
      this.props.onStopped(event.nativeEvent);
    }
  }

  _onPaused(event) {
    if (this.props.onPaused) {
      this.props.onPaused(event.nativeEvent);
    }
  }

  _onPlaying(event) {
    if (this.props.onPlaying) {
      this.props.onPlaying(event.nativeEvent);
    }
  }

  render() {
    const {
      source
    } = this.props;
    source.initOptions = source.initOptions || [];
    //repeat the input media
    source.initOptions.push('--input-repeat=1000');
    const nativeProps = Object.assign({}, this.props);
    Object.assign(nativeProps, {
      style: [styles.base, nativeProps.style],
      source: source,
      onVideoError: this._onError,
      onVideoProgress: this._onProgress,
      onVideoEnded: this._onEnded,
      onVideoPlaying:this._onPlaying,
      onVideoPaused:this._onPaused,
      onVideoStopped:this._onStopped,
      onVideoBuffering:this._onBuffering,
    });

    return (
      <RCTVLCPlayer ref={this._assignRoot} {...nativeProps} />
    );
  }


}

VLCPlayer.propTypes = {
  /* Native only */
  rate: PropTypes.number,
  seek:PropTypes.number,
  snapshotPath: PropTypes.string,
  paused: PropTypes.bool,

  /* Wrapper component */
  source: PropTypes.object,

  onError: PropTypes.func,
  onProgress: PropTypes.func,
  onEnded: PropTypes.func,
  onStopped: PropTypes.func,
  onPlaying: PropTypes.func,
  onPaused: PropTypes.func,
  onProgress: PropTypes.func,

  /* Required by react-native */
  scaleX: React.PropTypes.number,
  scaleY: React.PropTypes.number,
  translateX: React.PropTypes.number,
  translateY: React.PropTypes.number,
  rotation: React.PropTypes.number,
  ...View.propTypes,
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  }
});
const RCTVLCPlayer = requireNativeComponent('RCTVLCPlayer', VLCPlayer);
