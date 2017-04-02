import React, { Component, PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import style from './style';

import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

export default class Remove extends Component {

  static propTypes = {
    network: PropTypes.string,
    onPress: PropTypes.func,
  };

  render() {
    const { onPress, network } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[style.itemFeedback, style.itemRemove]}
        onPress={onPress}
      >
        <Icon
          style={[style.itemIcon, style.itemRemoveIcon]}
          name="cross"
          color={colors(network)}
          size={8}
        />
      </TouchableOpacity>
    );
  }
}
