import React, { Component, PropTypes } from 'react';
import { Text, View } from 'react-native';
import isNil from 'lodash/isNil';

import { getLastChange } from '../_utils/total';
import { format, ratio } from '../_utils/utils';
import { sum } from '../_utils/array';
import SoEmpty from '../placeholder/SoEmpty';

import Ratio from './Ratio';
import Diff from './Diff';
import style from './style';

export default class Stats extends Component {

  static propTypes = {
    data: PropTypes.object, // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    network: PropTypes.string,
  };

  render() {
    const { data, network, history } = this.props;
    const { Followers, Following } = data;
    const filterArr = [];

    Object.keys(data).filter(item => filterArr.push(data[item]));

    const content = Object.keys(data).filter(item => data[item] !== 0).map((item, i) => {
      const difference = history !== undefined ? getLastChange(history, item) : undefined;
      return this._renderRow(data, item, data[item], network, difference, i);
    });

    if (sum(filterArr) === 0) {
      return (
        <View style={style.itemDetail}>
          <SoEmpty network={network} />
        </View>
      );
    }

    const ratioPart = !isNil(Following) && !isNil(Followers)
      ? <Ratio ratio={ratio(Followers, Following)} />
      : undefined;

    return (
      <View style={style.itemDetail}>
        <Text style={style.itemTitle}>{'User statistics'.toUpperCase()}</Text>

        {content}
        {ratioPart}
      </View>
    );
  }

  _renderRow = (data, item, detail, network, difference, i) => {
    const diff = difference !== undefined
      ? <Diff network={network} diff={difference} />
      : undefined;

    return (
      <View key={`detail-row-${i}`} style={style.itemDetailRow}>
        <View>
          <Text style={[style.itemDetailRowText, style.itemDetailNumber]}>{format(detail)}</Text>
          <Text style={[style.itemDetailRowText, style.itemDetailLabel]}>{item}</Text>
        </View>

        {diff}
      </View>
    );
  }
}
