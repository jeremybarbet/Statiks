import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import _variables from '../_styles/variables';
import style from './style';

import Storage from '../_utils/storage';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

export default class Header extends Component {

  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    const { title } = this.props;

    const prevButton = title !== 'Statiks' ? (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => Actions.pop({ refresh: { updated: true } })}
        style={[style.navBarButton, style.navBarButtonLeft]}
      >
        <Icon
          name="arrow-left"
          size={14}
          color={_variables.graySaturate}
        />
      </TouchableOpacity>
    ) : undefined;

    const addNetwork = title === 'Statiks' ? (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={Actions.add}
        style={[style.navBarButton, style.navBarButtonRight]}
      >
        <Icon
          name="add"
          size={14}
          color={_variables.graySaturate}
        />
      </TouchableOpacity>
    ) : undefined;

    const removeData = title === 'Options' && __DEV__ ? ( // eslint-disable-line
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => Storage.clear()}
        style={[style.navBarButton, style.navBarButtonRight]}
      >
        <Text>Clear all</Text>
      </TouchableOpacity>
    ) : undefined;

    return (
      <View style={style.navBarContainer}>
        <View style={style.statusBar} />

        <View style={style.navBar}>
          <Text style={style.navBarTitleText}>
            {title}
          </Text>

          {prevButton}
          {addNetwork}
          {removeData}
        </View>
      </View>
    );
  }
}
