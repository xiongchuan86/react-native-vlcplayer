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
    let simplevideo = this.renderSimpleVideo(uri);
    let video       = null;//this.renderVideo(uri);
    return (
      <View>
      {simplevideo}
      {video}
      </View>
    );
  }

  renderSimpleVideo(uri){
    return (
      <View>
      <SimpleVideo uri={uri} buttonSize={50} />
      <Text>A Simple Player</Text>
      </View>
    );
  }

  renderVideo(uri){
    return (
      <View>
      <Video uri={uri} />
      <Text>A full-featured player</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('vlcplayer', () => vlcplayer);
