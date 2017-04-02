import React, { Component, PropTypes } from 'react';
import { TouchableOpacity } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import style from './style';

import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

export default class Success extends Component {

  static propTypes = {
    network: PropTypes.string,
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        style={[style.itemFeedback, style.itemSuccess]}
      >
        <Icon
          style={[style.itemIcon, style.itemSuccessIcon]}
          name="check"
          color={colors(this.props.network)}
          size={10}
        />
      </TouchableOpacity>
    );
  }
}
