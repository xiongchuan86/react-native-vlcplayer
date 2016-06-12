import React, { Component } from 'react';
import {
 AppRegistry
} from 'react-native';
import SimpleVideo  from './SimpleVideo.js';
import Video  from './Video.js';



class vlcplayer extends Component {

  render() {
    const uri = 'http://cdn.goluk.cn/video/t1_2.mp4';
    let simplevideo = (<SimpleVideo uri={uri} buttonSize={50} />);
    return (
      
      <Video uri={uri} />
    );
  }
}

AppRegistry.registerComponent('vlcplayer', () => vlcplayer);
