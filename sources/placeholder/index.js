import React, { Component, PropTypes } from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { Actions } from 'react-native-router-flux';

import global from '../_styles/global';
import style from './style';

import { colors } from '../_utils/networksColors';

export class Loading extends Component {

  static propTypes = {
    description: PropTypes.string,
  }

  render() {
    const { description } = this.props;

    return (
      <View style={[global.layout, style.defaultContainer, style.loadingContainer]}>
        <Image
          style={[style.defaultIllustration, style.loadingIllustration]}
          source={require('./images/emoji-loading.gif')}
        />

        <Text style={[style.defaultParagraph, style.loadingParagraph]}>{description}</Text>
      </View>
    );
  }
}

export class Empty extends Component {
  render() {
    return (
      <View style={[global.layout, style.defaultContainer]}>
        <Image
          style={style.defaultIllustration}
          source={require('./images/welcome-illu.png')}
        />

        <View>
          <Text style={style.defaultTitle}>{"Welcome to statiks".toUpperCase()}</Text>

          <Text style={style.defaultParagraph}>
            Hey buddy, you are ready to go ! Let’s add your networks and see the differents stats for each of them.
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.85} style={style.defaultButton} onPress={Actions.add}>
          <Text style={style.defaultButtonText}>Let’s start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class Error extends Component {
  render() {
    return (
      <View style={[global.layout, style.defaultContainer]}>
        <Image
          style={style.defaultIllustration}
          source={require('./images/error-illu.png')}
        />

        <View>
          <Text style={style.defaultTitle}>{"There is a problem!".toUpperCase()}</Text>

          <Text style={style.defaultParagraph}>
            I’m so sorry buddy, but something went wrong! Keep calm and reload the app.
          </Text>

          <Text style={style.defaultParagraph}>
            Hit me up at <Text style={style.defaultParagraphLink} onPress={() => Linking.openURL('https://twitter.com/JeremDsgn')}>@JeremDsgn</Text> if issues remaining. // eslint-disable-line
          </Text>
        </View>
      </View>
    );
  }
}

export class SoEmpty extends Component {

  static propTypes = {
    network: PropTypes.string,
  }

  render() {
    const { network } = this.props;

    return (
      <View>
        <Image
          style={[style.defaultIllustration, style.soEmptyIllustration]}
          source={require('./images/error-illu.png')}
        />

        <Text style={[style.defaultParagraph, style.SoEmptyParagraph]}>
          All your data are empty. Let’s make some activity on <Text style={{ color: colors(network) }}>{network}</Text> to display some data here!
        </Text>
      </View>
    );
  }
}
