import React from 'react-native';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import Storage from '../_utils/storage';
import Input from '../input'


const {
  Animated,
  Easing,
  Dimensions,
  Text,
  View,
  ScrollView,
  DeviceEventEmitter,
} = React;

const { width, height } = Dimensions.get('window');
const NETWORKS = ['dribbble', 'twitter', 'behance', 'cinqcentpx', 'github', 'vimeo', 'instagram', 'pinterest', 'soundcloud', 'producthunt'];
const HEADER_HEIGHT = 64;

export default React.createClass({
  getInitialState() {
    const screenHeight = height - HEADER_HEIGHT;
    return { keyboardSpace: new Animated.Value(screenHeight) }
  },

  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this._keyboardWillShow);
    DeviceEventEmitter.addListener('keyboardWillHide', this._keyboardWillHide);
  },

  render() {
    const { keyboardSpace } = this.state;

    return (
      <Animated.View style={{ height: keyboardSpace }}>
        <ScrollView
          ref="addScrollView"
          style={[ global.layout, style.addContainer ]}
          keyboardShouldPersistTaps={ true }
          keyboardDismissMode="interactive"
        >
          { NETWORKS.map((item, i) => { return <Input network={ item } key={ i } /> }) }
        </ScrollView>
      </Animated.View>
    );
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
