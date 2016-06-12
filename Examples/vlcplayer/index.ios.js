import React, { Component } from 'react';
import {
 AppRegistry,
 View,
 Text
} from 'react-native';
import SimpleVideo  from './SimpleVideo.js';
import Video  from './Video.js';



class vlcplayer extends Component {

  render() {
    const uri = 'http://cdn.goluk.cn/video/t1_2.mp4';
    return (
      <View>
      <SimpleVideo uri={uri} buttonSize={50} />
      <Text>A Simple Player</Text>
      <View style={{marginTop:50}} />
      <Video uri={uri} />
      <Text>A full-featured player</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('vlcplayer', () => vlcplayer);
