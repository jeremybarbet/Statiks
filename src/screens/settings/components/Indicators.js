import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';

import { colors } from 'utils/colors';

class Loading extends Component {

  static propTypes = {
    loaded: PropTypes.bool,
  };

  render() {
    return (
      <ActivityIndicator
        style={[s.indicator, s.indicator__loading]}
        animating={this.props.loaded}
        color="#fff"
        size="small"
        hidesWhenStopped
      />
    );
  }
}

class Remove extends Component {

  static propTypes = {
    network: PropTypes.string,
    onPress: PropTypes.func,
  };

  render() {
    const { onPress, network } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[s.indicator, s.indicator__remove]}
        onPress={onPress}
      >
        <Image
          style={[s.indicator__icon, s.indicator__removeIcon, { tintColor: colors(network) }]}
          source={require('../../../assets/images/cross.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }
}

class Success extends Component {

  static propTypes = {
    network: PropTypes.string,
  };

  render() {
    const { network } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[s.indicator, s.indicator__success]}
      >
        <Image
          style={[s.indicator__icon, s.indicator__successIcon, { tintColor: colors(network) }]}
          source={require('../../../assets/images/check.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }
}

const s = StyleSheet.create({
  indicator: {
    alignItems: 'center',

    position: 'absolute',
  },

  indicator__icon: {
    backgroundColor: 'transparent',
  },

  indicator__loading: {
    top: Platform.OS === 'ios' ? 4 : 16,
    left: 45,
  },

  indicator__success: {
    top: Platform.OS === 'ios' ? 1 : 12,
    left: 45,

    width: 26,
    height: 26,

    backgroundColor: '#fff',
    borderRadius: 26,
  },

  indicator__successIcon: {
    marginTop: 7,

    width: 14,
    height: 14,
  },

  indicator__remove: {
    top: Platform.OS === 'ios' ? 5 : 16,
    right: 18,

    width: 18,
    height: 18,

    backgroundColor: '#fff',
    borderRadius: 18,
  },

  indicator__removeIcon: {
    width: 8,
    height: 8,

    marginTop: 5,
  },
});

export {
  Loading,
  Remove,
  Success,
};
