import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import { v, fonts } from 'Theme';

const { width } = Dimensions.get('window');

class Empty extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func,
  }

  render() {
    const { onPress } = this.props;

    return (
      <View style={s.container}>
        <Image
          style={s.container__illustration}
          source={require('../assets/images/welcome-illu.png')}
        />

        <View>
          <Text style={s.container__title}>{'Welcome to statiks'.toUpperCase()}</Text>

          <Text style={s.container__paragraph}>
            Hey buddy, you are ready to go ! Let’s add your networks
            and see the differents stats for each of them.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={s.empty__button}
          onPress={onPress}
        >
          <Text style={s.empty__buttonText}>Let’s start</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Critical extends PureComponent {

  static propTypes = {
    onPress: PropTypes.func,
  }

  render() {
    const { onPress } = this.props;

    return (
      <View style={s.container}>
        <Image
          style={s.container__illustration}
          source={require('../assets/images/error-illu.png')}
        />

        <View>
          <Text style={s.container__title}>{'There is a problem!'.toUpperCase()}</Text>

          <Text style={s.container__paragraph}>
            I’m so sorry buddy, but something went wrong! Keep calm and restart the app.
          </Text>

          <Text style={s.container__paragraph}>
            Hit me up at <Text style={s.error__link} onPress={() => Linking.openURL('https://twitter.com/JeremDsgn')}>@JeremDsgn</Text> if the issue remains.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          style={[s.empty__button, s.empty__clear]}
          onPress={onPress}
        >
          <Text style={s.empty__buttonText}>Clear data</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Loading extends PureComponent {

  static propTypes = {
    description: PropTypes.string,
  }

  render() {
    const { description } = this.props;

    return (
      <View style={s.container}>
        <Image
          style={s.loading__illustration}
          source={require('../assets/images/emoji-loading.gif')}
        />

        <Text style={s.loading__paragraph}>{description}</Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',

    backgroundColor: v.bgBlue,
  },

  container__illustration: {
    alignSelf: 'center',

    marginLeft: -14,

    width: 275,
    height: 159,
  },

  container__title: {
    marginTop: 60,

    ...fonts.bold,
    fontSize: 16,
    color: v.dark,
    letterSpacing: 2,
    textAlign: 'center',
  },

  container__paragraph: {
    marginTop: 20,
    paddingHorizontal: 50,

    ...fonts.regular,
    fontSize: 14,
    color: v.lightBlue,
    lineHeight: 22,
    textAlign: 'center',
  },

  empty__button: {
    alignSelf: 'center',

    marginTop: 40,

    width: width / 2,

    backgroundColor: v.buttonGreen,
    borderRadius: 4,
  },

  empty__clear: {
    backgroundColor: v.buttonRed,
  },

  empty__buttonText: {
    paddingVertical: 18,

    ...fonts.medium,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',

    backgroundColor: 'transparent',
  },

  error__link: {
    ...fonts.medium,
    color: v.dark,
  },

  loading__illustration: {
    alignSelf: 'center',

    marginLeft: 0,
    marginTop: 320,

    width: 80,
    height: 97,
  },

  loading__paragraph: {
    textAlign: 'center',

    marginTop: 20,
    paddingHorizontal: 115,

    ...fonts.regular,
    fontSize: 14,
    color: v.lightBlue,
    lineHeight: 22,
  },
});

export {
  Empty,
  Critical,
  Loading,
};
