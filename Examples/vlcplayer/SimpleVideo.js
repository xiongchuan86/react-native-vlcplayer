
import React, { Component ,PropTypes} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import VLCPlayer from 'react-native-vlcplayer';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Bars } from 'react-native-loader';
import Slider from 'react-native-slider';
var RNFS = require('react-native-fs');

const playerDefaultHeight   = 250;
const playerDefaultWidth    = Dimensions.get('window').width;

export default class SimpleVideo extends Component {

  static propTypes = {
    uri:PropTypes.string
  }

  constructor(props) {
    super(props);
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
      progressWidth:playerDefaultWidth
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
    let actionButton = this.actionButton();
    return (
      <View style={styles.container}>
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
        {actionButton}
      </View>
    );
  }

  actionButton()
  {
    return (
      <Icon.Button onPress={this.saveVideoSnapshot.bind(this)} name="download" color={'green'} size={80}>save a snapshot</Icon.Button>
    );
  }

  saveVideoSnapshot()
  {
    let path = RNFS.DocumentDirectoryPath + '/1.png';
    console.warn("saveVideoSnapshot path="+path);
    this.refs['vlcplayer'].snapshot(path);
  }

  pause()
  {
    this.setState({paused:!this.state.paused});
  }

  onPlaying(event){
    this.setState({loadingColor:'rgba(255,255,255,0)'});
    this.setState({playButtonColor:'rgba(255,255,255,0)'});
  }

  onPaused(event){
    this.setState({loadingColor:'rgba(255,255,255,0)'});
    this.setState({playButtonColor:'rgba(255,255,255,1)'});
  }

  onBuffering(event){
    this.setState({playButtonColor:'rgba(255,255,255,0)'});
    this.setState({loadingColor:'rgba(255,255,255,1)'});
  }

  defaultControlsView(){
    return (
      <View>
        <View style={[styles.buttonBox,{backgroundColor:'rgba(0,0,0,0)'},this.state.customButtonStyle]}><Bars size={10} color={this.state.loadingColor}  /></View>
        <TouchableOpacity onPress={this.pause.bind(this)} activeOpacity={1} style={[styles.buttonBox,this.state.customButtonStyle]}>
            <Icon.Button onPress={this.pause.bind(this)} name="play-circle-o" color={this.state.playButtonColor} size={this.state.buttonSize} backgroundColor='rgba(0,0,0,0)'></Icon.Button>
        </TouchableOpacity>
        <Progress.Bar ref='progress' color={'rgba(255,0,0,1)'} borderRadius={0} progress={this.state.progress} height={3} borderWidth={0} width={this.state.progressWidth}/>
      </View>
    );
  }

  onProgress(event)
  {
    //console.warn("position="+event.position+",currentTime="+event.currentTime+",remainingTime="+event.remainingTime);
    this.setState({progress:event.position});
    this.setState({loadingColor:'rgba(255,255,255,0)'});
  }

  onEnded(event)
  {
    this.setState({progress:1,playend:true});
    this.setState({playButtonColor:'rgba(255,255,255,1)'});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
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
  }
});
