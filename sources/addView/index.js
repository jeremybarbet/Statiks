import React, { Component } from 'react';
import { Animated, Easing, Dimensions, View, ScrollView, NetInfo, Keyboard } from 'react-native';
import { get } from 'lodash';

import global from '../_styles/global';
import style from './style';

import api from '../api';
import Loading from '../placeholder/Loading';
import Input from '../addInput';
import Header from '../header/index';

const { height } = Dimensions.get('window');
const NETWORKS = Object.keys(api);
const HEADER_HEIGHT = 64;

export default class AddView extends Component {

  constructor() {
    super();

    const scrollHeight = height - HEADER_HEIGHT;

    this.state = {
      keyboardSpace: new Animated.Value(scrollHeight),
      scrollHeight,
      isConnected: null,
      size: null,
    };
  }

  input = []

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardShowRef = this._keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardHideRef = this._keyboardWillHide.bind(this));
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', this._handleConnectivity);
    this._checkConnectivity();
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectivity);

    Keyboard.removeListener('keyboardWillShow', this.keyboardShowRef);
    Keyboard.removeListener('keyboardWillHide', this.keyboardHideRef);
  }

  render() {
    const { keyboardSpace, isConnected } = this.state;

    if (!isConnected) {
      return <Loading description="Ooops, no connection. I'm trying to get back asap!" />;
    }

    return (
      <View style={{ flex: 1 }}>
        <Header title="Options" />

        <Animated.View style={{ height: keyboardSpace }}>
          <ScrollView
            ref={c => (this.scrollView = c)}
            style={[global.layout, style.addContainer]}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
            onScroll={this._contentSize}
            scrollEventThrottle={400}
          >
            {NETWORKS.map(item =>
              <Input
                key={`addView-${item}`}
                internalRef={c => (this.input[item] = c)}
                network={item}
                onPress={() => this.input[item].measure(this._scrollToInput)}
              />,
            )}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  _contentSize = ({ nativeEvent }) => {
    const { size } = this.state;
    const { contentSize } = nativeEvent;

    if (get(contentSize, 'height') === get(size, 'height')) {
      return;
    }

    this.setState({ size: nativeEvent.contentSize });
  }

  _scrollToInput = (ox, oy, width, height, px, py) => { // eslint-disable-line
    const { scrollHeight, size } = this.state;
    const max = get(size, 'height') - scrollHeight;
    const y = oy > max ? max : oy;

    this.scrollView.scrollTo({
      x: 0,
      y,
      animated: true,
    });
  }

  _checkConnectivity = () => {
    NetInfo.isConnected.fetch().done(isConnected => this.setState({ isConnected }));
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
    const scrollHeight = (height - HEADER_HEIGHT) - e.endCoordinates.height;

    this.setState({ scrollHeight });

    Animated.timing(keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: scrollHeight,
    }).start();
  }

  _keyboardWillHide() {
    const { keyboardSpace } = this.state;

    Animated.timing(keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: height - HEADER_HEIGHT,
    }).start();
  }
}
