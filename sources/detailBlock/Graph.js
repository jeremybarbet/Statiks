import React, { Component /* , PropTypes */ } from 'react';
import { Text, View } from 'react-native';

import style from './style';

export default class Graph extends Component {

  static propTypes = {
    // data: PropTypes.object,
  };

  render() {
    // const { data } = this.props;

    return (
      <View style={style.itemDetail}>
        <Text style={style.itemTitle}>{'Graphics'.toUpperCase()}</Text>

        <View />
      </View>
    );
  }
}
