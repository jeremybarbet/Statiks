import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';

import global from '../_styles/global';
import style from './style';

export default class Error extends Component {
  render() {
    return (
      <View style={[global.layout, style.defaultContainer]}>
        <Image
          style={style.defaultIllustration}
          source={require('./images/error-illu.png')} // eslint-disable-line
        />

        <View>
          <Text style={style.defaultTitle}>{'There is a problem!'.toUpperCase()}</Text>

          <Text style={style.defaultParagraph}>
            I’m so sorry buddy, but something went wrong! Keep calm and reload the app.
          </Text>

          <Text style={style.defaultParagraph}>
            Hit me up at <Text style={style.defaultParagraphLink} onPress={() => Linking.openURL('https://twitter.com/JeremDsgn')}>@JeremDsgn</Text> if issues remaining.
          </Text>
        </View>
      </View>
    );
  }
}
