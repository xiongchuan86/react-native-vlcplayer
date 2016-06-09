
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


export default class Video extends Component {

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
      position:0
    };
  }

  render() {
    let defaultControlsView = this.defaultControlsView();
    return (
      <View style={styles.container}>
        <VLCPlayer
        ref='vlcplayer'
        paused={this.state.paused}
        style={styles.vlcplayer}
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


        <View style={[styles.buttonBox,{backgroundColor:'rgba(0,0,0,0)'}]}><Bars size={10} color={this.state.loadingColor}  /></View>

        <TouchableOpacity onPress={this.pause.bind(this)} activeOpacity={1} style={styles.buttonBox}>
            <Icon.Button onPress={this.pause.bind(this)} style={styles.playButton} name="play-circle" color={this.state.playButtonColor} size={70} backgroundColor='rgba(0,0,0,0)'></Icon.Button>
        </TouchableOpacity>
        <Progress.Bar ref='progress' color={'rgba(255,0,0,1)'} borderRadius={0} progress={this.state.progress} height={3} borderWidth={0} width={Dimensions.get('window').width}/>
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
    width:Dimensions.get('window').width,
    height:250,
    backgroundColor:'black'
  },
  buttonBox:{
    position:'absolute',
    top:-250,
    alignItems: 'center',
    justifyContent: 'center',
    width:Dimensions.get('window').width,
    height:250
  }
});
