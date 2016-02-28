import React, {
  Animated,
  Easing,
  Dimensions,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
  NetInfo
} from 'react-native';

import TimerMixin from 'react-timer-mixin';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import api from '../api';
import Storage from '../_utils/storage';
import { LoadingPlaceholder } from '../placeholder';
import Input from '../addInput'


const { width, height } = Dimensions.get('window');
const NETWORKS = Object.keys(api);
const HEADER_HEIGHT = 64;

export default React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    const screenHeight = height - HEADER_HEIGHT;

    return {
      keyboardSpace: new Animated.Value(screenHeight),
      isConnected: null,
    }
  },

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this._keyboardWillShow);
    DeviceEventEmitter.addListener('keyboardWillHide', this._keyboardWillHide);
  },

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectivity);
    this._checkConnectivity();
  },

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectivity);
  },

  render() {
    const { keyboardSpace, isConnected } = this.state;

    if (!isConnected) return <LoadingPlaceholder description="Ooops, no connection. I'm trying to get back asap!" />

    return (
      <Animated.View style={{ height: keyboardSpace }}>
        <ScrollView
          ref="addScrollView"
          style={[ global.layout, style.addContainer ]}
          keyboardShouldPersistTaps={ true }
          keyboardDismissMode="interactive"
        >
          { NETWORKS.map((item, i) => <Input network={ item } key={ i } />) }
        </ScrollView>
      </Animated.View>
    );
  },

  _checkConnectivity() {
    NetInfo.isConnected.fetch().done((isConnected) => this.setState({ isConnected }));
  },

  _handleConnectivity(isConnected) {
    if (isConnected === false) {
      this.interval = setInterval(() => this._checkConnectivity(), 3000);
    } else {
      this._checkConnectivity();
      clearInterval(this.interval);
    }
  },

  _keyboardWillShow(e) {
    const { keyboardSpace } = this.state;
    const newHeight = (height - HEADER_HEIGHT) - e.endCoordinates.height;

    Animated.timing(this.state.keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: newHeight
    }).start();
  },

  _keyboardWillHide() {
    const { keyboardSpace } = this.state;

    Animated.timing(keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: height - HEADER_HEIGHT
    }).start();
  },
});
