import React, {
  Dimensions,
  ScrollView,
  Image,
  Text,
  ListView,
  View,
  Animated,
  PanResponder,
  TouchableOpacity,
  Linking,
  StatusBarIOS
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import { omit } from '../_utils/object';
import fontelloConfig from '../config.json';
import api from '../_utils/api';
import objectDiff from '../_utils/diff';
import Storage from '../_utils/storage';
import Item from '../item'


const { width } = Dimensions.get('window');
const Icon = createIconSetFromFontello(fontelloConfig);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const LoadingPlaceholder = React.createClass({
  render() {
    return (
      <View style={[ global.layout, style.welcomeContainer ]}>
        <Text style={ style.loading }>Loading...</Text>
      </View>
    );
  }
});

export const EmptyPlaceholder = React.createClass({
  render() {
    return (
      <View style={[ global.layout, style.welcomeContainer ]}>
        <Image style={ style.welcomeIllustration } source={ require('./images/welcome-illu.png') } />

        <View>
          <Text style={ style.welcomeTitle }>{ "Welcome to statiks".toUpperCase() }</Text>
          <Text style={ style.welcomeParagraph }>Hey buddy, you are ready to go ! Let’s add your networks and see the differents stats for each of them.</Text>
        </View>

        <TouchableOpacity activeOpacity={ 0.85 } style={ style.welcomeButton } onPress={ Actions.add }>
          <Text style={ style.welcomeButtonText }>Let’s start</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

export const ErrorPlaceholder = React.createClass({
  render() {
    return (
      <View style={[ global.layout, style.welcomeContainer ]}>
        <Image style={ style.welcomeIllustration } source={ require('./images/error-illu.png') } />

        <View>
          <Text style={ style.welcomeTitle }>{ "There is a problem!".toUpperCase() } </Text>
          <Text style={ style.welcomeParagraph }>I’m so sorry buddy, but something went wrong! Keep calm and reload the app.</Text>
          <Text style={ style.welcomeParagraph }>Hit me up at <Text style={ style.welcomeParagraphLink } onPress={ () => Linking.openURL('https://twitter.com/JeremDsgn') }>@JeremDsgn</Text> if issues remaining.</Text>
        </View>
      </View>
    );
  }
});

export default React.createClass({
  componentDidMount() {
    StatusBarIOS.setHidden(false);
  },

  componentWillMount() {
    this._loadStorage().done();

    this._animatedValueX = 0;
    this.state.pan.x.addListener((value) => this._animatedValueX = value.value);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({ x: this._animatedValueX });
        this.state.pan.setValue({ x: 0 });
      },

      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x },
      ]),

      onPanResponderRelease: () => {
        // Remove item if x value is enough
        if (this.state.pan.x._value < -150) this._deleteItem(this.state.currentSwipeItem)

        // Reset to default value
        Animated.spring(this.state.pan, { toValue: 0 }).start();
      },
    });
  },

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
  },

  componentWillReceiveProps() {
    this._loadStorage().done();
  },

  async _loadStorage() {
    try {
      let value = await Storage.get('userData');

      if (value !== null && Object.keys(value).length > 0) {
        console.log('Recovered selection from disk');
        this.setState({ data: value, syncDate: value['preferences'].syncDate, isLoading: false, isError: false, isEmpty: false });
      } else {
        console.log('Initialized with no selection on disk.');
        this.setState({ isLoading: false, isError: false, isEmpty: true });
      }
    } catch (error) {
      console.log('Storage error: ' + error.message);
      this.setState({ isLoading: false, isError: true });
    }
  },

  getInitialState() {
    return {
      data: '',
      isLoading: true,
      isError: false,
      isEmpty: true,
      pan: new Animated.ValueXY(),
      currentSwipeItem: '',
      syncDate: undefined
    };
  },

  render() {
    const { data, isLoading, isError, isEmpty, syncDate } = this.state;

    if (isLoading) return <LoadingPlaceholder />
    if (isEmpty) return <EmptyPlaceholder />
    if (isError) return <ErrorPlaceholder />

    return (
      <ScrollView style={[ global.layout, style.listContainer ]}>
        <Text onPress={ this._reloadData }>RELOAD</Text>

        {
          Object.keys(data).filter(item => item !== 'preferences').map((item, i) => {
            return this._renderRow(item, data[item], syncDate, i);
          })
        }
      </ScrollView>
    );
  },

  _saveEditedDate() {
    const obj = {};
    const date = moment().unix();
    const detail = { 'syncDate': date };

    obj['preferences'] = detail;
    this.setState({ syncDate: date })
    Storage.actualize('userData', obj);
  },

  _reloadData() {
    const { data } = this.state;

    // Save date of last sync -> to move for each detail of network or not dunno
    this._saveEditedDate();

    // Reload api for each networks added
    Object.keys(data).filter(item => item !== 'preferences').map(item => {
      api[item](item, data[item].Username, data[item]); // Just for development right now
    });
  },

  _deleteItem(item) {
    const oldNetworks = this.state.data;
    const newNetworks = omit(oldNetworks, item);

    Storage.save('userData', newNetworks);
    this.setState({ data: newNetworks });
  },

  _scaleDeleteIcon() {
    const { pan } = this.state;

    return [{
      transform: [{
        scale: pan.x.interpolate({
          inputRange: [0, 200],
          outputRange: [0, 1]
        })
      }]
    }];
  },

  _onSwipe(item) {
    this.setState({ currentSwipeItem: item });
  },

  _renderRow(item, dataNetwork, syncDate, index) {
    return (
      <View key={ index }>
        <Animated.View style={[ style.deleteContainer, this._scaleDeleteIcon() ]} { ...this._panResponder.panHandlers }>
          <Icon style={ style.deleteContainerIcon } name="cross" size={ 18 } />
        </Animated.View>

        <AnimatedScrollView
          horizontal={ true }
          directionalLockEnabled={ true }
          onScroll={ this._onSwipe.bind(this, item) }
          { ...this._panResponder.panHandlers }
        >
          <Item
            key={ index }
            network={ item }
            data={ dataNetwork }
            sync={ syncDate }
          />
        </AnimatedScrollView>
      </View>
    )
  },
});
