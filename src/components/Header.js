import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, Text, TouchableOpacity, Platform } from 'react-native';

import { isIphoneX } from 'utils/utils';
import { v, fonts } from 'Theme';

const NAV_BAR_HEIGHT = 39;
const STATUS_BAR_HEIGHT = 20;

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string,
    onPrev: PropTypes.func,
    onAdd: PropTypes.func,
  }

  render() {
    const { title, onPrev, onAdd } = this.props;

    const prevButton = title !== 'Statiks' && (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPrev}
        style={[s.header__button, s.header__left]}
      >
        <Image style={s.header__arrow} source={require('../assets/images/arrow-left.png')} />
      </TouchableOpacity>
    );

    const addNetwork = title === 'Statiks' && (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onAdd}
        style={[s.header__button, s.header__right]}
      >
        <Image style={s.header__add} source={require('../assets/images/add.png')} />
      </TouchableOpacity>
    );

    return (
      <View style={s.header}>
        <View style={s.header__status} />

        <View style={s.header__nav}>
          <Text style={s.header__title}>
            {title}
          </Text>

          {prevButton}
          {addNetwork}
        </View>
      </View>
    );
  }
}

function padding() {
  if (isIphoneX()) {
    return { paddingTop: 20 };
  }

  return { paddingTop: Platform.select({ ios: 0, android: 10 }) };
}

const s = StyleSheet.create({
  header: {
    ...padding(),
    paddingBottom: Platform.select({ ios: 5, android: 14 }),

    backgroundColor: v.bgBlue,
  },

  header__status: {
    height: Platform.select({ ios: STATUS_BAR_HEIGHT, android: 0 }),
  },

  header__nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    height: NAV_BAR_HEIGHT,
  },

  header__title: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.select({ ios: 9, android: 7 }),

    ...fonts.medium,
    fontSize: 16,
    color: v.graySaturate,
    letterSpacing: 0.25,
    textAlign: 'center',
  },

  header__button: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  header__left: {
    marginLeft: 14,

    marginTop: Platform.select({ ios: 6, android: 10 }),
  },

  header__arrow: {
    width: 9,
    height: 16,

    tintColor: v.graySaturate,
  },

  header__add: {
    width: 16,
    height: 16,

    tintColor: v.graySaturate,
  },

  header__right: {
    position: 'absolute',
    right: 14,

    marginTop: Platform.select({ ios: 6, android: 10 }),
  },
});
