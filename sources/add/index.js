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
const HEADER_HEIGHT = 64;

export default React.createClass({
  getInitialState() {
    const screenHeight = height - HEADER_HEIGHT;

    return {
      data: '',
      isLoading: true,
      keyboardSpace: new Animated.Value(screenHeight)
    };
  },

  componentWillMount() {
    this._loadInitialState().done();

    DeviceEventEmitter.addListener('keyboardWillShow', this._keyboardWillShow);
    DeviceEventEmitter.addListener('keyboardWillHide', this._keyboardWillHide);
  },

  componentDidUpdate() {
    // this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      const value = await Storage.get('userData');

      if (value !== null) {
        // console.log('Recovered selection from disk');

        this.setState({
          data: value,
          isLoading: false
        });
      } else {
        // console.log('Initialized with no selection on disk.');
      }
    } catch (err) {
      // console.log('AsyncStorage error :(');
      // console.log(err);
    }
  },

  _renderRow(item, username, i) {
    const value = (username !== undefined) ? username : undefined;

    /*
    * TODO
    * - Change text props
    */
    return (
      <Input
        onFocus={ this._handleFocus.bind(this, item) }
        value={ value }
        ref={ item }
        key={ i }
        network={ item }
      />  
    );
  },

  render() {
    const { data, isLoading, keyboardSpace } = this.state;
    const networks = ['dribbble', 'twitter', 'behance', 'cinqcentpx', 'github', 'vimeo', 'instagram', 'pinterest', 'soundcloud', 'producthunt'];

    return (
      <Animated.View style={{ height: keyboardSpace }}>
        <ScrollView
          ref="addScrollView"
          style={[ global.layout, style.addContainer ]}
          keyboardShouldPersistTaps={ true }
          keyboardDismissMode="interactive"
        >
          {
            networks.map((item, i) => {
              let username;
              if (!isLoading) username = (data.hasOwnProperty(item)) ? data[item].username : undefined;

              return this._renderRow(item, username, i);
            })
          }
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

  /*
  * Measure function doesn't work
  * What the actuel f**k
  */
  _handleFocus(item) {
    const scrollView = this.refs.addScrollView.getScrollResponder();
    // const inputToScroll = React.findNodeHandle(this.refs[item]);

    // scrollView.scrollTo(inputToScroll, 0, true);
  },
});
