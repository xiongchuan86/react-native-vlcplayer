## 参考代码

Video.js 封装的一个 适用于 mobile 的播放器

在自己的代码里面可以直接使用

```
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
```
