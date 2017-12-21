import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, Text, TouchableOpacity, Platform } from 'react-native';

import { v, fonts } from 'Theme';

import { SETTINGS } from '../screens';

const NAV_BAR_HEIGHT = 39;
const STATUS_BAR_HEIGHT = 20;

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string,
  }

  handlePrev = () => {
    this.props.navigator.pop();
  }

  handleAdd = () => {
    this.props.navigator.push({ screen: SETTINGS });
  }

  render() {
    const { title } = this.props;

    const prevButton = title !== 'Statiks' && (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={this.handlePrev}
        style={[s.header__button, s.header__left]}
      >
        <Image style={s.header__arrow} source={require('../assets/images/arrow-left.png')} />
      </TouchableOpacity>
    );

    const addNetwork = title === 'Statiks' && (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={this.handleAdd}
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

const s = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? 0 : 15,
    paddingBottom: Platform.OS === 'ios' ? 5 : 15,

    backgroundColor: v.bgBlue,
  },

  header__status: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
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
    bottom: 7,

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
  },
});
