import React, {
  Dimensions,
  PixelRatio,
  StyleSheet
} from 'react-native';

import _variables from '../_styles/variables';


const { width } = Dimensions.get('window');

export default StyleSheet.create({
  // Welcome illustration
  welcomeContainer: {
    flexDirection: 'column',
    justifyContent: 'center'
  },

  welcomeIllustration: {
    width: 551 / PixelRatio.get(),
    height: 318 / PixelRatio.get(),
    alignSelf: 'center',
    marginLeft: -14,
  },

  welcomeTitle: {
    fontFamily: _variables.dinBold,
    fontSize: 16,
    color: _variables.dark,
    letterSpacing: 2,
    marginTop: 60,
    textAlign: 'center'
  },

  welcomeParagraph: {
    fontFamily: _variables.din,
    fontSize: 14,
    color: _variables.lightBlue,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 50,
  },

  welcomeParagraphLink: {
    fontFamily: _variables.dinMedium,
    color: _variables.green,
  },

  welcomeButton: {
    marginTop: 40,
    backgroundColor: _variables.buttonGreen,
    borderRadius: 4,
    width: width / 2,
    alignSelf: 'center',
  },

  welcomeButtonText: {
    backgroundColor: 'transparent',
    color: _variables.white,
    fontSize: 16,
    fontFamily: _variables.dinMedium,
    paddingVertical: 18,
    textAlign: 'center',
  },

  loading: {
    color: _variables.graySaturate,
  },
});
