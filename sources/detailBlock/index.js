import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';

import { getLastChange } from '../_utils/total';
import { size } from '../_utils/object';
import { format, ratio } from '../_utils/utils';
import { sum } from '../_utils/array';
import { colors } from '../_utils/networksColors';
import { SoEmpty } from '../placeholder';

import style from './style';

export class NetworkActivity extends Component {
  render() {
    return (
      <View style={ style.itemDetail }>
        <Text style={ style.itemTitle }>{ "Activity".toUpperCase() }</Text>

        <View>

        </View>
      </View>
    );
  }
}

export class NetworkGraph extends Component {
  render() {
    const { data } = this.props;

    return (
      <View style={ style.itemDetail }>
        <Text style={ style.itemTitle }>{ "Graphics".toUpperCase() }</Text>

        <View>

        </View>
      </View>
    );
  }
}

export class NetworkStats extends Component {
  render() {
    const { data, network, history } = this.props;

    const filterArr = [];
    Object.keys(data).filter(item => filterArr.push(data[item]));

    const content = Object.keys(data).filter(item => data[item] !== 0).map((item, i) => {
      const difference = history !== undefined ? getLastChange(history, item) : undefined;
      return this._renderRow(data, item, data[item], network, difference, i);
    });

    if (sum(filterArr) === 0) {
      return (
        <View style={ style.itemDetail }>
          <SoEmpty network={ network } />
        </View>
      )
    }

    // I could create little function to check if not undefined or equal to zero
    const ratioPart = (data.Following !== undefined && data.Following !== 0 && data.Followers !== undefined && data.Followers !== 0) ? <RatioBlock ratio={ ratio(data.Followers, data.Following) } /> : undefined;

    return (
      <View style={ style.itemDetail }>
        <Text style={ style.itemTitle }>{ "User statistics".toUpperCase() }</Text>

        { content }
        { ratioPart }
      </View>
    );
  }

  _renderRow = (data, item, detail, network, difference, i) => {
    const diff = (difference !== undefined) ? <DiffNumber network={ network } diff={ difference } /> : undefined;

    return (
      <View key={ i } style={ style.itemDetailRow }>
        <View>
          <Text style={[ style.itemDetailRowText, style.itemDetailNumber ]}>{ format(detail) }</Text>
          <Text style={[ style.itemDetailRowText, style.itemDetailLabel ]}>{ item }</Text>
        </View>

        { diff }
      </View>
    );
  }
}

class RatioBlock extends Component {
  render() {
    const { ratio } = this.props;

    return (
      <View style={[ style.itemDetailRow ]}>
        <View>
          <Text style={[ style.itemDetailRowText, style.itemDetailNumber ]}>{ ratio }</Text>
          <Text style={[ style.itemDetailRowText, style.itemDetailLabel ]}>Ratio followers/following</Text>
        </View>

        {/*
        <View style={[ style.itemDetailGrowth, { backgroundColor: colors(network) } ]}>
          <Text style={ style.itemDetailGrowthNumber }>+4</Text>
        </View>
        */}
      </View>
    );
  }
}

class DiffNumber extends Component {
  render() {
    const { diff, network } = this.props;

    return (
      <View style={[ style.itemDetailGrowth, { backgroundColor: colors(network) } ]}>
        <Text style={ style.itemDetailGrowthNumber }>{ (diff > 0) ? `+${ diff }` : diff }</Text>
      </View>
    );
  }
}
