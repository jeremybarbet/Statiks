import React, { Component } from 'react';
import { StyleSheet, Animated, Easing, Dimensions, View, ScrollView, Keyboard } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import get from 'lodash/get';

import Header from 'components/Header';

import { v } from 'styles/variables';
import { navigatorTypes } from 'utils/types';
import { api } from 'Api';

import Input from './components/Input';

const { height } = Dimensions.get('window');
const NETWORKS = Object.keys(api);
const HEADER_HEIGHT = 64;

@inject('stats')
@observer
export default class Settings extends Component {

  static propTypes = {
    ...navigatorTypes,
  }

  static navigatorStyle = {
    navBarHidden: true,
  }

  constructor() {
    super();

    const scrollHeight = height - HEADER_HEIGHT;

    this.state = {
      keyboardSpace: new Animated.Value(scrollHeight),
      scrollHeight,
      size: null,
    };
  }

  input = []

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardShowRef = this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardHideRef = this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    Keyboard.removeListener('keyboardWillShow', this.keyboardShowRef);
    Keyboard.removeListener('keyboardWillHide', this.keyboardHideRef);
  }

  render() {
    const { navigator, stats } = this.props;
    const { keyboardSpace } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <Header navigator={navigator} title="Options" />

        <Animated.View style={{ height: keyboardSpace }}>
          <ScrollView
            ref={(c) => { this.scrollView = c; }}
            style={s.settings}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
            onScroll={this.contentSize}
            scrollEventThrottle={400}
          >
            {NETWORKS.map(item =>
              <Input
                key={`addView-${item}`}
                internalRef={(c) => { this.input[item] = c; }}
                username={stats.getUsername(item)}
                network={item}
                onPress={() => this.input[item].measure(this.scrollToInput)}
              />,
            )}
          </ScrollView>
        </Animated.View>
      </View>
    );
  }

  contentSize = ({ nativeEvent }) => {
    const { size } = this.state;
    const { contentSize } = nativeEvent;

    if (get(contentSize, 'height') === get(size, 'height')) {
      return;
    }

    this.setState({ size: nativeEvent.contentSize });
  }

  scrollToInput = (ox, oy, width, height, px, py) => { // eslint-disable-line
    const { scrollHeight, size } = this.state;
    const max = get(size, 'height') - scrollHeight;
    const y = oy > max ? max : oy;

    this.scrollView.scrollTo({
      x: 0,
      y,
      animated: true,
    });
  }

  keyboardWillShow(e) {
    const { keyboardSpace } = this.state;
    const scrollHeight = (height - HEADER_HEIGHT) - e.endCoordinates.height;

    this.setState({ scrollHeight });

    Animated.timing(keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: scrollHeight,
    }).start();
  }

  keyboardWillHide() {
    const { keyboardSpace } = this.state;

    Animated.timing(keyboardSpace, {
      easing: Easing.inOut(Easing.ease),
      duration: 250,
      toValue: height - HEADER_HEIGHT,
    }).start();
  }
}

const s = StyleSheet.create({
  settings: {
    flex: 1,

    paddingTop: 10,

    backgroundColor: v.bgBlue,
  },
});
