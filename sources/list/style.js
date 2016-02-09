import React from 'react-native';

import _variables from '../_styles/variables';


const {
  Dimensions,
  PixelRatio,
  StyleSheet
} = React;

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  listContainer: {
    paddingTop: 10,
  },

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

  // Swipe items
  deleteContainer: {
    position: 'absolute',
    right: 45,
    top: 30,
    width: 50,
    height: 50,
    backgroundColor: '#E22030',
    borderRadius: 50 / PixelRatio.get(),
  },

  deleteContainerIcon: {
    backgroundColor: 'transparent',
    color: _variables.white,
    textAlign: 'center',
    marginTop: 16

  }
});
