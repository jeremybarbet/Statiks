import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

import { colors } from '../_utils/networksColors';

import style from './style';

export default class Diff extends Component {

  static propTypes = {
    diff: PropTypes.number,
    network: PropTypes.string,
  };

  render() {
    const { diff, network } = this.props;

    return (
      <View style={[style.itemDetailGrowth, { backgroundColor: colors(network) }]}>
        <Text style={style.itemDetailGrowthNumber}>{(diff > 0) ? `+${diff}` : diff}</Text>
      </View>
    );
  }
}
