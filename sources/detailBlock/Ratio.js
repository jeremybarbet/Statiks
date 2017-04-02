import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';

// import { colors } from '../_utils/networksColors';

import style from './style';

export default class Ratio extends Component {

  static propTypes = {
    ratio: PropTypes.string,
  };

  render() {
    const { ratio } = this.props;

    return (
      <View style={style.itemDetailRow}>
        <View>
          <Text style={[style.itemDetailRowText, style.itemDetailNumber]}>
            {ratio}
          </Text>

          <Text style={[style.itemDetailRowText, style.itemDetailLabel]}>
            Ratio followers/following
          </Text>
        </View>

        {/*
        <View style={[style.itemDetailGrowth, { backgroundColor: colors(network) }]}>
          <Text style={style.itemDetailGrowthNumber}>+4</Text>
        </View>
        */}
      </View>
    );
  }
}
