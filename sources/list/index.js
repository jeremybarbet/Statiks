import React, {
  Dimensions,
  ScrollView,
  Image,
  Text,
  ListView,
  View,
  Animated,
  PanResponder,
  TouchableOpacity
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Actions } from 'react-native-router-flux';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import fontelloConfig from '../config.json';
import Storage from '../_utils/storage';
import Item from '../item'


const { width } = Dimensions.get('window');
const Icon = createIconSetFromFontello(fontelloConfig);
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const Placeholder = React.createClass({
  render() {
    const { error } = this.props;

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
})

export default React.createClass({
  getInitialState() {
    return {
      data: '',
      isLoading: true,
      isError: false,
      isEmpty: true,
      pan: new Animated.ValueXY()
    };
  },

  componentWillMount() {
    const { pan } = this.state;

    // console.log('----------PAN---------');
    // console.log(pan);

    // Load data
    this._loadInitialState().done();

    // Define default swipe value
    this._animatedValueX = 0;
    pan.x.addListener((value) => this._animatedValueX = value.value);

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderGrant: (e, gestureState) => {
        pan.setOffset({ x: this._animatedValueX });
        pan.setValue({ x: 0 });
      },

      onPanResponderMove: () => {
        // console.log('move baby, move');

        Animated.event([
          null, {
            dx: pan.x
          },
        ])
      },

      onPanResponderRelease: () => {
        // console.log('release');

        // console.log(this.state.pan.x._value);

        if (this.state.pan.x._value < -150) {
          // console.log('release me and you delete me');
        }

        // Animated.spring(pan, {
        //   toValue: 0,
        // }).start();
      },
    });
  },

  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();
  },

  componentWillReceiveProps(nextProps) {
    this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      const value = await Storage.get('userData');

      // console.log(value);

      if (value !== null) {
        // console.log('Recovered selection from disk');

        this.setState({
          data: value,
          isLoading: false,
          isError: false,
          isEmpty: false
        });
      } else {
        // console.log('Initialized with no selection on disk.');

        this.setState({
          isLoading: false,
          isError: false,
          isEmpty: true
        });
      }
    } catch (err) {
      // console.log('Storage error :(');
      // console.log(err);

      this.setState({
        isLoading: false,
        isError: true
      });
    }
  },

  render() {
    const { data, isLoading, isError, isEmpty } = this.state;

    // console.log(this.state);

    if (isLoading) {
      return (
        <View style={[ global.layout, style.loadingContainer ]}>
          <Text style={ style.loading }>Loading...</Text>
        </View>
      );
    }

    if (isEmpty) return <Placeholder />
    if (isError) return <Placeholder error={ isError } />

    return (
      <ScrollView style={[ global.layout, style.listContainer ]}>
        {
          Object.keys(data).map((item, i) => {
            const dataNetwork = data[item];
            return this._renderRow(item, dataNetwork, i);
          })
        }
      </ScrollView>
    );
  },

  _animateScroll(index, e) {
    const { pan } = this.state;

    let threshold = width / 5;
    let x = e.nativeEvent.contentOffset.x;

    x = x * -1;

    // console.log(pan);

    // console.log(`x swipe value : ${x}`);

    // scale.interpolate({
    //   inputRange: [0, e.nativeEvent.contentOffset.x],
    //   outputRange: [0, 1],
    // });

    // console.log(scale._value);

    // Animated.timing(scale, {
    //   toValue: 1,
    //   duration: 120,
    // }).start();


    // if (x < -100) {
    //   Animated.timing(this.state.scale, {
    //     toValue: deleteScale,
    //     duration: 120,
    //   }).start();

    //   this._deleteItem(index);
    // } else {
    //   Animated.timing(this.state.scale, {
    //     toValue: 0.6,
    //     duration: 120,
    //   }).start();
    // }
  },

  _deleteItem(index) {
    // console.log('Delete moi !!');

    /*
    * Get the object `userData`
    * Get the swipe network name
    * Remove from the object the network
    * Push the new dataObject to state and storage
    */

    const toto = Storage.get('userData').then(item => {
      let itemToDelete = Object.keys(item)[index];
      // console.log(itemToDelete);
    });

    // Storage.delete('userData')[]
  },

  _scaleDelete() {
    const { pan } = this.state;

    // console.log('======================================');

    return [{
      transform: [
        {
          scale: this.state.pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [0.5, 1, 0.5]
          })
        }
      ]
    }];
  },

  _renderRow(item, dataNetwork, i) {
    const { scale, pan } = this.state;

    // console.log(pan);

    // onScroll={ this._animateScroll.bind(this, i) }
    // onMomentumScrollBegin={ this._deleteItem.bind(this, i) }

    return (
      <View key={ i }>
        <Animated.View style={[ style.deleteContainer ]} { ...this._panResponder.panHandlers }>
          <Icon style={ style.deleteContainerIcon } name="cross" size={ 18 } />
        </Animated.View>

        {/*
        <AnimatedScrollView
          horizontal={ true }
          directionalLockEnabled={ true }
          scrollEventThrottle={ 16 }
          { ...this._panResponder.panHandlers }
        >
        */}
          <Item
            key={ i }
            network={ item }
            data={ dataNetwork }
          />
        {/*
        </AnimatedScrollView>
        */}
      </View>
    )
  },
});
