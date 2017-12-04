import { Dimensions, PixelRatio, StyleSheet } from 'react-native';

import _variables from '../_styles/variables';

const { width } = Dimensions.get('window');

export default StyleSheet.create({

  // Default illustration style
  defaultContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  defaultIllustration: {
    width: 551 / PixelRatio.get(),
    height: 318 / PixelRatio.get(),
    alignSelf: 'center',
    marginLeft: -14,
  },

  defaultTitle: {
    fontFamily: _variables.dinBold,
    fontSize: 16,
    color: _variables.dark,
    letterSpacing: 2,
    marginTop: 60,
    textAlign: 'center',
  },

  defaultParagraph: {
    fontFamily: _variables.din,
    fontSize: 14,
    color: _variables.lightBlue,
    lineHeight: 22,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 50,
  },

  defaultParagraphLink: {
    fontFamily: _variables.dinMedium,
    color: _variables.green,
  },

  defaultButton: {
    marginTop: 40,
    backgroundColor: _variables.buttonGreen,
    borderRadius: 4,
    width: width / 2,
    alignSelf: 'center',
  },

  defaultButtonText: {
    backgroundColor: 'transparent',
    color: _variables.white,
    fontSize: 16,
    fontFamily: _variables.dinMedium,
    paddingVertical: 18,
    textAlign: 'center',
  },

  // Custom style for each placeholder
  loadingContainer: {
    justifyContent: 'flex-start',
  },

  loadingIllustration: {
    width: 160 / PixelRatio.get(),
    height: 195 / PixelRatio.get(),
    marginLeft: 0,
    marginTop: 320 / PixelRatio.get(),
  },

  loadingParagraph: {
    paddingHorizontal: 115,
  },

  soEmptyIllustration: {
    marginTop: 60,
    marginBottom: 5,
  },

  SoEmptyParagraph: {
    marginBottom: 40,
  },
});
