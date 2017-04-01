import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';

import style from './style';

import { colors } from '../_utils/networksColors';

export default class SoEmpty extends Component {

  static propTypes = {
    network: PropTypes.string,
  }

  render() {
    const { network } = this.props;

    return (
      <View>
        <Image
          style={[style.defaultIllustration, style.soEmptyIllustration]}
          source={require('./images/error-illu.png')} // eslint-disable-line
        />

        <Text style={[style.defaultParagraph, style.SoEmptyParagraph]}>
          All your data are empty. Let’s make some activity on
          <Text style={{ color: colors(network) }}>{network}</Text>
          to display some data here!
        </Text>
      </View>
    );
  }
}
