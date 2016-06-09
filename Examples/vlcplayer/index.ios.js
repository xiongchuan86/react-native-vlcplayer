import React, { Component } from 'react';
import {
 AppRegistry
} from 'react-native';
import Video  from './Video.js';



class vlcplayer extends Component {

  render() {
    const uri = 'http://cdn.goluk.cn/video/t1_2.mp4';
    return (
      <Video uri={uri} />
    );
  }
}

AppRegistry.registerComponent('vlcplayer', () => vlcplayer);
