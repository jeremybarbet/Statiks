import React, { Component } from 'react';
import { StyleSheet, Image, ScrollView, View, Animated, PanResponder, RefreshControl, StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { observable, toJS } from 'mobx';

import v from 'styles/variables';
import { navigatorTypes } from 'utils/types';

import { Empty } from 'components/Placeholders';
import Header from 'components/Header';

import Item from './components/Item';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

@inject('stats')
@observer
export default class List extends Component {

  @observable
  isRefreshing = false;

  static propTypes = {
    ...navigatorTypes,
  }

  static navigatorStyle = {
    navBarHidden: true,
  }

  state = {
    pan: new Animated.ValueXY(),
    currentSwipeItem: '',
  }

  componentWillMount() {
    this.animatedValueX = 0;
    this.state.pan.x.addListener(value => this.animatedValueX = value.value); // eslint-disable-line

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        this.state.pan.setOffset({ x: this.animatedValueX });
        this.state.pan.setValue({ x: 0 });
      },

      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x },
      ]),

      onPanResponderRelease: () => {
        // Remove item if x value is enough
        if (this.state.pan.x._value < -150) this.deleteItem(this.state.currentSwipeItem); // eslint-disable-line

        // Reset to default value
        Animated.spring(this.state.pan, { toValue: 0 }).start();
      },
    });
  }

  componentDidMount() {
    StatusBar.setHidden(false);
  }

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
    clearTimeout(this.refreshTimeout);
  }

  render() {
    const { navigator, stats } = this.props;
    const { data } = stats;
    const parsed = toJS(data);

    if (data.size <= 0) return <Empty navigator={navigator} />;

    return (
      <View style={{ flex: 1 }}>
        <Header navigator={navigator} title="Statiks" />

        <ScrollView
          style={s.list}
          refreshControl={<RefreshControl
            refreshing={this.isRefreshing}
            onRefresh={this.onRefresh}
            tintColor={v.graySaturateLighter}
          />}
        >
          {Object.keys(parsed).map(network => this.renderRow(network, parsed[network]))}

          {stats.total && (
            <Item
              title="total"
              description={`${data.size} network${data.size === 1 ? '' : 's'} connected`}
              data={stats.total}
              navigator={navigator}
            />
          )}
        </ScrollView>
      </View>
    );
  }

  deleteItem = (network) => {
    this.props.stats.delete(network);
  }

  scaleDeleteIcon = () => {
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

  onRefresh = async () => {
    this.isRefreshing = true;

    await this.props.stats.updateAll();

    this.isRefreshing = false;
  }

  onSwipe = (item) => {
    this.setState({ currentSwipeItem: item });
  }

  renderRow = (network, stats) => {
    const { navigator } = this.props;

    return (
      <View key={network}>
        <Animated.View
          style={[s.list__delete, this.scaleDeleteIcon()]}
          {...this.panResponder.panHandlers}
        >
          <Image style={s.list__deleteIcon} source={require('../../assets/images/cross.png')} />
        </Animated.View>

        <AnimatedScrollView
          horizontal
          directionalLockEnabled
          onScroll={() => this.onSwipe(network)}
          scrollEventThrottle={32}
          {...this.panResponder.panHandlers}
        >
          <Item
            network={network}
            data={stats}
            navigator={navigator}
          />
        </AnimatedScrollView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  list: {
    flex: 1,

    paddingTop: 10,

    backgroundColor: v.bgBlue,
  },

  list__delete: {
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    right: 45,
    top: 30,

    width: 50,
    height: 50,

    backgroundColor: '#E22030',
    borderRadius: 50,
  },

  list__deleteIcon: {
    width: 18,
    height: 18,

    backgroundColor: 'transparent',
    tintColor: '#fff',
  },
});
