import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import global from '../_styles/global';
import style from './style';

export default class Empty extends Component {

  render() {
    return (
      <View style={[global.layout, style.defaultContainer]}>
        <Image
          style={style.defaultIllustration}
          source={require('./images/welcome-illu.png')} // eslint-disable-line
        />

        <View>
          <Text style={style.defaultTitle}>{'Welcome to statiks'.toUpperCase()}</Text>

          <Text style={style.defaultParagraph}>
            Hey buddy, you are ready to go ! Let’s add your networks
            and see the differents stats for each of them.
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={style.defaultButton} onPress={Actions.add}>
          <Text style={style.defaultButtonText}>Let’s start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
