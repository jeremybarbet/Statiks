import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import global from '../_styles/global';
import style from './style';

export default class Loading extends Component {

  static propTypes = {
    description: PropTypes.string,
  }

  render() {
    const { description } = this.props;

    return (
      <View style={[global.layout, style.defaultContainer, style.loadingContainer]}>
        <Image
          style={[style.defaultIllustration, style.loadingIllustration]}
          source={require('./images/emoji-loading.gif')} // eslint-disable-line
        />

        <Text style={[style.defaultParagraph, style.loadingParagraph]}>{description}</Text>
      </View>
    );
  }
}
