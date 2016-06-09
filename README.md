# react-native-vlcplayer

A `<VLCPlayer>` component for react-native  
此项目 参考react-native-video，但是有很多mp4 ios的硬解码无法播放，所以诞生了这个项目，这是一个足够简单的封装，全功能播放器的控制条留给自己去实现，同时可以参考[移动播放器][2]的例子。

VLCPlayer 支持各种格式(mp4,m3u8,flv,mov,rtsp,rtmp,etc.)，具体参看[vlc wiki][3]

![暂停](1.png =200x)
![播放](2.png =200x)

### Add it to your project

Run `npm install react-native-vlcplayer --save`

#### iOS

Install [rnpm](https://github.com/rnpm/rnpm) and run `rnpm link react-native-vlcplayer`



## Usage
这是一个极其简单的VLC播放器，默认是不带控制条和进度条，但是完全可以通过回调实现自己需要的样式的播放器，参看例子[Examples vlcplayer][2]

```
<VLCPlayer
    ref='vlcplayer'
    paused={this.state.paused}  //通过paused设置player play or pause的状态
    style={styles.vlcplayer}
    source={{uri:this.props.uri,initOptions:['--codec=avcodec']}} //uri，可以是vlc支持的串流，或者普通的url,initOptions VLC支持的初始化选项 ,See [vlc 命令行参数][1]
    onProgress={this.onProgress.bind(this)} //进度回调
    onEnded={this.onEnded.bind(this)} //结束回调，一般使用stopped即可
    onStopped={this.onEnded.bind(this)} //停止回调
    onPlaying={this.onPlaying.bind(this)} //开始播放回调
    onBuffering={this.onBuffering.bind(this)} //正在缓冲回调
    onPaused={this.onPaused.bind(this)} //暂停回调
 />
 
```

## Static Methods

`seek(seconds)`

```
this.refs['vlcplayer'].seek(1); //单位是 0~1 的百分比
```

## Examples

- 进入 [移动播放器][2]  
- `npm install`   
- `rnpm link`  
- 同时需要安装`ART`   
参考[https://github.com/oblador/react-native-vector-icons][4]


## TODOS

- [ ] Add support for Android
- [ ] Add support for snapshot
- [ ] Add support for record


## 加入ReactNative讨论组  
  
###`QQ群：316434159`  ###
![扫描加入][5]

[1]:https://wiki.videolan.org/VLC_command-line_help/
[2]:https://github.com/xiongchuan86/react-native-vlcplayer/tree/master/Examples/vlcplayer
[3]:https://wiki.videolan.org/Documentation:Documentation/
[4]:https://github.com/oblador/react-native-vector-icons
[5]:ReactNative_qq_group.png

---

**MIT Licensed**
