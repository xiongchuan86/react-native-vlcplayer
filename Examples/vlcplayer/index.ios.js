import React, { Component } from 'react';
import {
 AppRegistry,
 View
} from 'react-native';
import SimpleVideo  from './SimpleVideo.js';
import Video  from './Video.js';



class vlcplayer extends Component {

  render() {
    const uri = 'http://cdn.goluk.cn/video/t1_2.mp4';
    let simplevideo = (<SimpleVideo uri={uri} buttonSize={50} />);
    return (
      <View>

      {simplevideo}
      <View style={{marginTop:50}} />
      <Video uri={uri} />

      </View>
    );
  }
}

AppRegistry.registerComponent('vlcplayer', () => vlcplayer);
