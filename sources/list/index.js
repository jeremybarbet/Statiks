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
  StatusBarIOS,
  RefreshControl
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import TimerMixin from 'react-timer-mixin';
import moment from 'moment';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import { dataIsEmpty } from '../_utils/utils';
import { omit, size } from '../_utils/object';
import fontelloConfig from '../config.json';
import api from '../api';
import objectDiff from '../_utils/diff';
import Storage from '../_utils/storage';
import { LoadingPlaceholder, EmptyPlaceholder, ErrorPlaceholder } from '../placeholder';
import Item from '../item'


const { width } = Dimensions.get('window');
const Icon = createIconSetFromFontello(fontelloConfig);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function dataObj(value) {
  return Object.keys(value).filter(item => item !== 'preferences' && item !== 'total');
}

export default React.createClass({
  mixins: [TimerMixin],

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

      if (dataObj(value).length > 0) {
        console.log('Recovered selection from disk');
        const datetime = !dataIsEmpty(value.preferences) ? value.preferences.syncDate : '';
        this.setState({ data: value, isLoading: false, isError: false, isEmpty: false, syncDate: datetime });
      } else {
        console.log('Initialized with no selection on disk.');
        this.setState({ isLoading: false, isError: false, isEmpty: true });
      }
    } catch(error) {
      console.log('Storage error: ' + error.message);
      this.setState({ isLoading: false, isError: true });
    }
  },

  getInitialState() {
    return {
      data: '',
      isRefreshing: false,
      isLoading: true,
      isError: false,
      isEmpty: true,
      pan: new Animated.ValueXY(),
      currentSwipeItem: '',
      syncDate: ''
    };
  },

  render() {
    const { data, isLoading, isError, isEmpty, syncDate, isRefreshing } = this.state;

    const temp = {
      stats: {
        Followers: 345,
        Following: 70,
        Likes: 1207,
        "Likes received": 907,
        Projects: 0,
        Shots: 23,
      },
      user: {
        Avatar: "https://d13yacurqjgara.cloudfront.net/users/24613/avatars/normal/707f2ac2819fc2ec94cc10ac43723635.jpeg?1435334157",
        Bio: "Designer at @Zengularity. twitter.com/JeremDsgn",
        Location: "Paris, France",
        Name: "Jérémy Barbet",
      }
    }

    if (isLoading) return <LoadingPlaceholder />
    if (isEmpty) return <EmptyPlaceholder />
    if (isError) return <ErrorPlaceholder />

    const networkConnected = `${ size(dataObj(data)) } network${ (size(dataObj(data)) === 1) ? '' : 's' } connected`;

    return (
      <ScrollView
        style={[ global.layout, style.listContainer ]}
        refreshControl={
          <RefreshControl
            refreshing={ isRefreshing }
            onRefresh={ this._onRefresh }
            tintColor={ _variables.graySaturateLighter }
          />
        }
      >
        {
          dataObj(data).map((item, i) => {
            // For each network create a sum of each key value of data[item].data.stats
            return this._renderRow(item, data[item].data, syncDate, i);
          })
        }

        <View>
          <Item
            title="total"
            description={ networkConnected }
            data={ data.total }
            sync={ syncDate }
          />
        </View>
      </ScrollView>
    );
  },

  _saveEditedDate() {
    const obj = {};
    const date = moment().unix();

    this.setState({ syncDate: date });

    obj['preferences'] = { 'syncDate': date };
    Storage.actualize('userData', obj);

    return date;
  },

  _deleteItem(item) {
    const { data } = this.state;
    const newNetworks = omit(data, item);

    // Bounce effet on remove icon when release touch
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

  _onRefresh() {
    const { data } = this.state;
    const that = this;
    this.setState({ isRefreshing: true });

    dataObj(data).map(item => {
      Promise.resolve(api[item](item, data[item].data.user.Username, data[item], this._saveEditedDate())).then((value) => {
        if (value === 'success') {
          that.setTimeout(() => {
            that.setState({ isRefreshing: false });
          }, 300);
        } else {
          console.log('error');
          that.setState({ isRefreshing: false });
        }
      });
    });
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
