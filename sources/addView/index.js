import React, { Component } from 'react';
import { Animated, Easing, Dimensions, Text, View, ScrollView, DeviceEventEmitter, NetInfo, Keyboard } from 'react-native';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import api from '../api';
import Storage from '../_utils/storage';
import * as Placeholders from '../placeholder';
import Input from '../addInput';
import Header from '../header/index';

const { width, height } = Dimensions.get('window');
const NETWORKS = Object.keys(api);
const HEADER_HEIGHT = 64;

export default class AddView extends Component {
  constructor(props) {
    super(props);

    const screenHeight = height - HEADER_HEIGHT;
    console.log(screenHeight)

    this.state = {
      keyboardSpace: new Animated.Value(screenHeight),
      isConnected: null,
    }
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectivity);
    this._checkConnectivity();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectivity);

    Keyboard.removeListener('keyboardWillShow', this._keyboardWillShow);
    Keyboard.removeListener('keyboardWillHide', this._keyboardWillHide);
  }

  render() {
    const { keyboardSpace, isConnected } = this.state;

    if (!isConnected) return <Placeholders.Loading description="Ooops, no connection. I'm trying to get back asap!" />

    return (
      <View style={{ flex: 1 }}>
        <Header title="Options" />

        <Animated.View style={{ height: keyboardSpace }}>
          <ScrollView
            ref="addScrollView"
            style={[ global.layout, style.addContainer ]}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
          >
            { NETWORKS.map((item, i) => <Input network={ item } key={ i } />) }
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  _checkConnectivity() {
    NetInfo.isConnected.fetch().done((isConnected) => this.setState({ isConnected }));
  }

  _handleConnectivity = (isConnected) => {
    if (isConnected === false) {
      this.interval = setInterval(() => this._checkConnectivity(), 3000);
    } else {
      this._checkConnectivity();
      clearInterval(this.interval);
    }
  }

  _keyboardWillShow(e) {
    const { keyboardSpace } = this.state;
    const newHeight = (height - HEADER_HEIGHT) - e.endCoordinates.height;

    Animated.timing(this.state.keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: newHeight
    }).start();
  }

  _keyboardWillHide() {
    const { keyboardSpace } = this.state;

    Animated.timing(keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: height - HEADER_HEIGHT
    }).start();
  }
}
