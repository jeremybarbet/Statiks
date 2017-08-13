import React, { Component } from 'react';
import { ScrollView, View, Animated, PanResponder, StatusBar, RefreshControl, NetInfo } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import moment from 'moment';
import { isEmpty as _isEmpty, omit, size } from 'lodash';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import fontelloConfig from '../config.json';
import api from '../api';
import Storage from '../_utils/storage';
import objTotal from '../_utils/total';
import Loading from '../placeholder/Loading';
import Empty from '../placeholder/Empty';
import Error from '../placeholder/Error';
import Item from '../listItem';
import Header from '../header/index';

const Icon = createIconSetFromFontello(fontelloConfig);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const getNetworks = v => Object.keys(v).filter(item => item !== 'preferences' && item !== 'total');
const getTotal = v => Object.keys(v).filter(item => item === 'total');

const findAndRemove = (arr, val) => {
  const i = arr.indexOf(val);

  if (i !== -1) {
    return arr.splice(i, 1);
  }

  return arr;
};

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
    // Storage.clear();

    this._loadStorage().done();

    this._animatedValueX = 0;
    this.state.pan.x.addListener(value => this._animatedValueX = value.value); // eslint-disable-line

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
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
      const value = await Storage.get('userData');

      if (!_isEmpty(getNetworks(value))) {
        const datetime = !_isEmpty(value.preferences) ? value.preferences.syncDate : null;

        this.setState({
          data: value,
          isLoading: false,
          isError: false,
          isEmpty: false,
          syncDate: datetime,
        });
      } else {
        this.setState({
          isLoading: false,
          isError: false,
          isEmpty: true,
        });
      }
    } catch (error) {
      this.setState({
        isLoading: false,
        isError: true,
      });
    }
  }

  render() {
    const { data, isLoading, isError, isEmpty, syncDate, isRefreshing, isConnected } = this.state;

    if (isLoading) return <Loading description="Data are coming!" />;
    if (isEmpty) return <Empty />;
    if (isError) return <Error />;

    const sizeData = size(getNetworks(data));
    const networkConnected = `${sizeData} network${sizeData === 1 ? '' : 's'} connected`;

    const refresh = isConnected ? (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={this._onRefresh}
        tintColor={_variables.graySaturateLighter}
      />
    ) : undefined;

    return (
      <View style={{ flex: 1 }}>
        <Header title="Statiks" />

        <ScrollView
          style={[global.layout, style.listContainer]}
          refreshControl={refresh}
        >
          {getNetworks(data).map((item, i) => this._renderRow(item, data[item], syncDate, i))}

          {data.total !== undefined && getTotal(data).map((item, i) =>
            <View
              key={`total-${i}`} // eslint-disable-line
            >
              <Item
                title="total"
                description={networkConnected}
                data={data[item]}
                sync={syncDate}
              />
            </View>,
          )}
        </ScrollView>
      </View>
    );
  }

  _checkConnectivity = () => {
    NetInfo.isConnected.fetch().done(isConnected => this.setState({ isConnected })); // eslint-disable-line
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
    obj.preferences = { syncDate: date };
    Storage.actualize('userData', obj);

    return date;
  }

  _deleteItem = (item) => {
    const { data } = this.state;
    const newArr = findAndRemove(data.total.networks, item); // eslint-disable-line
    const newNetworks = omit(data, item);
    const isEmpty = Object.keys(getNetworks(newNetworks)).length === 0;

    objTotal.subtract(data.total.stats, data[item].data.stats);
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

    return getNetworks(data).map((item) => {
      const apiQuery = api[item](
        item,
        data[item].data.user.Username,
        data[item],
        this._saveEditedDate(),
        data.total,
      );

      return Promise.resolve(apiQuery).then((value) => {
        if (value.state === 'success') {
          this.refreshTimeout = setTimeout(() => {
            this._loadStorage().done();
            this.setState({ isRefreshing: false });
          }, 300);
        } else {
          this.setState({ isRefreshing: false });
        }
      });
    });
  }

  _onSwipe = (item) => {
    this.setState({ currentSwipeItem: item });
  }

  _renderRow = (item, dataNetwork, syncDate, index) => (
    <View key={index}>
      <Animated.View
        style={[style.deleteContainer, this._scaleDeleteIcon()]}
        {...this._panResponder.panHandlers}
      >
        <Icon
          style={style.deleteContainerIcon}
          name="cross"
          size={18}
        />
      </Animated.View>

      <AnimatedScrollView
        horizontal
        directionalLockEnabled
        onScroll={() => this._onSwipe(item)}
        scrollEventThrottle={32}
        {...this._panResponder.panHandlers}
      >
        <Item
          network={item}
          data={dataNetwork.data}
          sync={syncDate}
          history={dataNetwork.history}
        />
      </AnimatedScrollView>
    </View>
  )
}
