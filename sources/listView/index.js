import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Animated, PanResponder, StatusBar, RefreshControl, NetInfo } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import moment from 'moment';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import { dataIsEmpty } from '../_utils/utils';
import { omit, size } from '../_utils/object';
import fontelloConfig from '../config.json';
import api from '../api';
import Storage from '../_utils/storage';
import * as Placeholders from '../placeholder';
import Item from '../listItem';
import Header from '../header/index';

const { width } = Dimensions.get('window');
const Icon = createIconSetFromFontello(fontelloConfig);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function dataObj(value) {
  return Object.keys(value).filter(item => item !== 'preferences' && item !== 'total');
}

export default class List extends Component {
  state = {
    data: '',
    isRefreshing: false,
    isLoading: true,
    isError: false,
    isEmpty: true,
    pan: new Animated.ValueXY(),
    currentSwipeItem: '',
    syncDate: '',
    isConnected: null,
  }

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
        if (this.state.pan.x._value < -150) this._deleteItem(this.state.currentSwipeItem);

        // Reset to default value
        Animated.spring(this.state.pan, { toValue: 0 }).start();
      },
    });
  }

  componentDidMount() {
    StatusBar.setHidden(false);

    NetInfo.isConnected.addEventListener('change', this._handleConnectivity);
    this._checkConnectivity();
  }

  componentWillReceiveProps() {
    this._loadStorage().done();
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    NetInfo.isConnected.removeEventListener('change', this._handleConnectivity);
    clearTimeout(this.refreshTimeout);
  }

  async _loadStorage() {
    try {
      let value = await Storage.get('userData');

      if (dataObj(value).length > 0) {
        // console.log('Recovered selection from disk');
        const datetime = !dataIsEmpty(value.preferences) ? value.preferences.syncDate : '';
        this.setState({ data: value, isLoading: false, isError: false, isEmpty: false, syncDate: datetime });
      } else {
        // console.log('Initialized with no selection on disk.');
        this.setState({ isLoading: false, isError: false, isEmpty: true });
      }
    } catch(error) {
      // console.log('Storage error: ' + error.message);
      this.setState({ isLoading: false, isError: true });
    }
  }

  render() {
    const { data, isLoading, isError, isEmpty, syncDate, isRefreshing, isConnected } = this.state;

    if (isLoading) return <Placeholders.Loading description="Data are coming!" />;
    if (isEmpty) return <Placeholders.Empty />;
    if (isError) return <Placeholders.Error />;

    const networkConnected = `${size(dataObj(data))} network${(size(dataObj(data)) === 1) ? '' : 's'} connected`;
    const refresh = (isConnected) ? <RefreshControl refreshing={isRefreshing} onRefresh={this._onRefresh} tintColor={_variables.graySaturateLighter} /> : undefined;

    return (
      <View style={{ flex: 1 }}>
        <Header title="Statiks" />

        <ScrollView
          style={[global.layout, style.listContainer]}
          refreshControl={refresh}
        >
          {dataObj(data).map((item, i) => this._renderRow(item, data[item], syncDate, i))}

          {/*
          <View>
            <Item
              title="total"
              description={networkConnected}
              data={data.total}
              sync={syncDate}
            />
          </View>
          */}
        </ScrollView>
      </View>
    );
  }

  _checkConnectivity = () => {
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

  _saveEditedDate = () => {
    const obj = {};
    const date = moment().unix();

    this.setState({ syncDate: date });

    obj['preferences'] = { 'syncDate': date };
    Storage.actualize('userData', obj);

    return date;
  }

  _deleteItem = (item) => {
    const { data } = this.state;
    const newNetworks = omit(data, item);
    const isEmpty = Object.keys(dataObj(newNetworks)).length === 0;

    /**
    * Remove stats from total object and remove item from array of networks into total object
    * Bounce effet on remove icon when release touch
    */
    // objTotal.subtract(data['total'].stats, data[item].data.stats);
    Storage.save('userData', newNetworks);

    this.setState({
      data: newNetworks,
      isEmpty,
    });
  }

  _scaleDeleteIcon = () => {
    const { pan } = this.state;

    return [{
      transform: [{
        scale: pan.x.interpolate({
          inputRange: [100, 200],
          outputRange: [0.6, 1],
        }),
      }],
    }];
  }

  _onRefresh = () => {
    const { data } = this.state;
    this.setState({ isRefreshing: true });

    dataObj(data).map(item => {
      Promise.resolve(api[item](item, data[item].data.user.Username, data[item], this._saveEditedDate(), data.total))
      .then((value) => {
        if (value === 'success') {
          this.refreshTimeout = setTimeout(() => {
            this.setState({ isRefreshing: false });
          }, 300);
        } else {
          console.log('error');
          this.setState({ isRefreshing: false });
        }
      });
    });
  }

  _onSwipe = (item) => {
    this.setState({ currentSwipeItem: item });
  }

  _renderRow = (item, dataNetwork, syncDate, index) => {
    return (
      <View key={index}>
        <Animated.View style={[style.deleteContainer, this._scaleDeleteIcon()]} {...this._panResponder.panHandlers}>
          <Icon
            style={style.deleteContainerIcon}
            name="cross"
            size={18}
          />
        </Animated.View>

        <AnimatedScrollView
          horizontal
          directionalLockEnabled
          onScroll={this._onSwipe.bind(this, item)}
          scrollEventThrottle={32}
          {...this._panResponder.panHandlers}
        >
          <Item
            key={index}
            network={item}
            data={dataNetwork.data}
            sync={syncDate}
            history={dataNetwork.history}
          />
        </AnimatedScrollView>
      </View>
    );
  }
}
