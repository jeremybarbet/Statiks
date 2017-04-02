import React, { Component } from 'react';
import { Text, View } from 'react-native';

import style from './style';

export default class Activity extends Component {
  render() {
    return (
      <View style={style.itemDetail}>
        <Text style={style.itemTitle}>{'Activity'.toUpperCase()}</Text>

        <View />
      </View>
    );
  }
}
