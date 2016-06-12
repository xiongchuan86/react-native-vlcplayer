
import React, { Component ,PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native';
import VLCPlayer from 'react-native-vlcplayer';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bars } from 'react-native-loader';
import Slider from 'react-native-slider';
var Orientation = require('react-native-orientation');

const playerDefaultHeight   = 250;
const playerDefaultWidth    = Dimensions.get('window').width;

export default class Video extends Component {

  static propTypes = {
    uri:PropTypes.string
  }

  constructor(props) {
    super(props);
    Orientation.lockToPortrait();
    this.anim = this.anim || new Animated.Value(0);
    this.state = {
      progress: 0,
      indeterminate: true,
      paused:false,
      playButtonColor:'rgba(255,255,255,0)',
      loadingColor:'rgba(255,255,255,0)',
      playend:false,
      position:0,
      customStyle:{},
      customButtonStyle:{},
      buttonSize:70,
      progressWidth:playerDefaultWidth,
      video:{time:'00:00',duration:'00:00'},
      bottomBoxStyle:{},
      thumbTouchSize:{width:10,height:10},
      playing:false,
      duration:0,
      fullscreen:false,
      customTrackStyle:{}
    };
    this.state.customStyle = Object.assign({},this.props.style);

    if(this.state.customStyle.width){
      this.state.progressWidth = this.state.customStyle.width;
      this.state.customButtonStyle.width = this.state.customStyle.width;
    }

    if(this.state.customStyle.height){
      this.state.customButtonStyle.height = this.state.customStyle.height;
      this.state.customButtonStyle.top = - (this.state.customStyle.height);
    }

    if(this.props.buttonSize){
      this.state.buttonSize = this.props.buttonSize;
    }

    this.state.customButtonStyle = Object.assign(this.state.customButtonStyle,this.props.buttonStyle);
  }

  render() {
    let defaultControlsView = this.defaultControlsView();
    return (
      <View style={styles.container} ref='windowView'>
        <VLCPlayer
        ref='vlcplayer'
        paused={this.state.paused}
        style={[styles.vlcplayer,this.state.customStyle]}
        source={{uri:this.props.uri,initOptions:['--codec=avcodec']}}
        onProgress={this.onProgress.bind(this)}
        onEnded={this.onEnded.bind(this)}
        onStopped={this.onEnded.bind(this)}
        onPlaying={this.onPlaying.bind(this)}
        onBuffering={this.onBuffering.bind(this)}
        onPaused={this.onPaused.bind(this)}
         />
        {defaultControlsView}
      </View>
    );
  }

  pause()
  {
    this.setState({paused:!this.state.paused});
  }

  onPlaying(event){
    this.setState({loadingColor:'rgba(255,255,255,0)',playing:true});
    this.setState({playButtonColor:'rgba(255,255,255,0)'});
  }

  onPaused(event){
    this.setState({loadingColor:'rgba(255,255,255,0)',playing:false});
    this.setState({playButtonColor:'rgba(255,255,255,1)'});
  }

  onBuffering(event){
    this.setState({playButtonColor:'rgba(255,255,255,0)'});
    this.setState({loadingColor:'rgba(255,255,255,1)'});
  }

  defaultControlsView(){
    let playButton = (<View style={{backgroundColor:'rgba(0,0,0,0.5)'}}><Icon.Button opacity={1} style={[styles.playButton,styles.button]} size={10} onPress={this.pause.bind(this)} name="play" color='#fff' ></Icon.Button></View>);
    let pauseButton = (<View style={{backgroundColor:'rgba(0,0,0,0.5)'}}><Icon.Button opacity={1} style={[styles.playButton,styles.button]} size={10} onPress={this.pause.bind(this)} name="pause" color='#fff' ></Icon.Button></View>);
    let playOrPause = this.state.playing ? pauseButton : playButton;
    return (
      <View>
        <View style={[styles.buttonBox,{backgroundColor:'rgba(0,0,0,0)'},this.state.customButtonStyle]}><Bars size={10} color={this.state.loadingColor}  /></View>
        <View style={[styles.bottomBox,this.state.bottomBoxStyle]}>
          <View hidden={true} style={styles.playButtonBox}>
            {playOrPause}
          </View>
          <Text style={styles.time}>{this.state.video.time}</Text>
          <Slider maximumValue={0.97} thumbTouchSize={this.state.thumbTouchSize} thumbTintColor='#fff' thumbStyle={styles.thumbStyle} style={[styles.sliderStyle,this.state.customTrackStyle]} trackStyle={[styles.trackStyle,this.state.customTrackStyle]} value={this.state.progress} onValueChange={this.seek.bind(this)} />
          <Text style={styles.time}>{this.state.video.duration}</Text>
          <View style={{backgroundColor:'rgba(0,0,0,0.5)'}}><Icon.Button opacity={1} style={styles.playButton} size={10} onPress={this.fullscreen.bind(this)} name="expand" color='#fff' ></Icon.Button></View>
        </View>

      </View>
    );
  }

  seek(value){
    this.refs['vlcplayer'].seek(value);
    let duration = this.state.duration;
    let curtime  = duration * value;
    this.setState({paused:false,playing:true,video:{time:this.formatTime(curtime),duration:this.formatTime(duration)}});
  }

  fullscreen()
  {
    if(this.state.fullscreen){
      this.setState({fullscreen:false});

      this.refs['windowView'].setNativeProps({style:[{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
      }]});
      this.refs['vlcplayer'].setNativeProps({style:[styles.vlcplayer,this.state.customStyle]});
      this.setState({customTrackStyle:{width:(Dimensions.get('window').height-120)}});
      Orientation.lockToPortrait();
    }else{
      this.setState({fullscreen:true});
      this.refs['windowView'].setNativeProps({style:[{
        height:Dimensions.get('window').width,
        width:Dimensions.get('window').height,
      }]});
      this.refs['vlcplayer'].setNativeProps({style:[{
        height:Dimensions.get('window').width,
        width:Dimensions.get('window').height,
      }]});
      this.setState({customTrackStyle:{width:(Dimensions.get('window').height-120)}});
      Orientation.lockToLandscapeLeft();
    }


  }

  onProgress(event)
  {
    //console.warn("position="+event.position+",currentTime="+event.currentTime+",remainingTime="+event.remainingTime);
    this.setState({progress:event.position});
    this.setState({duration:event.duration,video:{time:this.formatTime(event.currentTime),duration:this.formatTime(event.duration)}});
    this.setState({loadingColor:'rgba(255,255,255,0)'});
  }

  formatTime(i){
    let text = '';
    let t = Math.ceil( i / 1000 );
    if( t < 60 ){
      text = '00:' + (t < 10 ?  '0'+t : t );
    }else if(t>=60 && t < 3600){
      let min = Math.floor(t/60);
      let sec = (t - min*60);
      text =  (min < 10 ?  '0'+min : min ) + ':' + (sec < 10 ?  '0'+sec : sec ) ;
    }else{
      let hour = Math.floor(t/3600);
      let min  = Math.floor((t - hour*3600)/60);
      text =  (hour < 10 ?  '0'+hour : hour ) + ':' + (min < 10 ?  '0'+min : min ) + ':' + (t - hour*3600 - min*60);
    }
    return text;
  }

  onEnded(event)
  {
    this.setState({playButtonColor:'rgba(255,255,255,1)'});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  vlcplayer:{
    width:playerDefaultWidth,
    height:playerDefaultHeight,
    backgroundColor:'black',
  //  transform:[{rotate:'90deg'}]
  },
  buttonBox:{
    position:'absolute',
    top:-(playerDefaultHeight),
    alignItems: 'center',
    justifyContent: 'center',
    width:playerDefaultWidth,
    height:playerDefaultHeight
  },
  playButton:{
    width:20,
    height:20,
    backgroundColor:'rgba(0,0,0,1)'
  },
  playButtonBox:{
    width:20,
    height:20
  },
  bottomBox:{
    width:playerDefaultWidth,
    height:20,
    left:0,
    top:-20,
    position:'absolute',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  sliderStyle:{
    height:20,
    width:playerDefaultWidth-120,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  trackStyle:{
    width:playerDefaultWidth-120,
    height:2
  },
  thumbStyle:{
    backgroundColor:'#fff',
    width:10,
    height:10
  },
  time:{
    color:'#fff',
    width:40,
    textAlign: 'center',
    justifyContent: 'center',
    height:20,
    paddingTop:5,
    fontSize:8,
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  button:{
    backgroundColor:'rgba(0,0,0,1)'
  }
});
