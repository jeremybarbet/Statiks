import React, {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBarIOS,
} from 'react-native';

import style from './style';

import { format, sum } from '../_utils/utils';
import { colors } from '../_utils/networksColors';
import { SoEmpty } from '../placeholder';


export const NetworkActivity = React.createClass({
  render() {
    return (
      <View style={ style.itemDetail }>
        <Text style={ style.itemTitle }>{ "Activity".toUpperCase() }</Text>

        <View>

        </View>
      </View>
    );
  }
});

export const NetworkGraph = React.createClass({
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
})

export const NetworkStats = React.createClass({
  render() {
    const { data, network } = this.props;

    const filterArr = [];
    Object.keys(data).filter(item => filterArr.push(data[item]));

    const content = Object.keys(data).filter(item => data[item] !== 0).map((item, i) => {
      return this._renderRow(data, item, data[item], network, i)
    });

    if (sum(filterArr) === 0) {
      return (
        <View style={ style.itemDetail }>
          <SoEmpty network={ network } />
        </View>
      )
    }

    return (
      <View style={ style.itemDetail }>
        <Text style={ style.itemTitle }>{ "User statistics".toUpperCase() }</Text>

        { content }

        <View style={[ style.itemDetailRow ]}>
          <View>
            <Text style={[ style.itemDetailRowText, style.itemDetailNumber ]}>{ `${ Math.ceil(data.Followers / data.Following) }:1` }</Text>
            <Text style={[ style.itemDetailRowText, style.itemDetailLabel ]}>Ratio followers/following</Text>
          </View>

          {/*
          <View style={[ style.itemDetailGrowth, { backgroundColor: colors(network) } ]}>
            <Text style={ style.itemDetailGrowthNumber }>+4</Text>
          </View>
          */}
        </View>
      </View>
    );
  },

  _renderRow(data, item, detail, network, i) {
    return (
      <View key={ i } style={ style.itemDetailRow }>
        <View>
          <Text style={[ style.itemDetailRowText, style.itemDetailNumber ]}>{ format(detail) }</Text>
          <Text style={[ style.itemDetailRowText, style.itemDetailLabel ]}>{ item }</Text>
        </View>

        <View style={[ style.itemDetailGrowth, { backgroundColor: colors(network) } ]}>
          <Text style={ style.itemDetailGrowthNumber }>+4</Text>
        </View>
      </View>
    );
  },

});
