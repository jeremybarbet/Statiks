import React, {
  PixelRatio,
  StyleSheet
} from 'react-native';

import _variables from '../_styles/variables';


export default StyleSheet.create({
  // Item container
  itemContainer: {
    marginHorizontal: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 2,
    marginBottom: 15,
  },

  // Feedback icons
  itemFeedback: {
    position: 'absolute',
    top: 10,
    left: 45,
  },

  itemSuccess: {
    top: 5,
    backgroundColor: _variables.white,
    width: 28,
    height: 28,
    borderRadius: 28 / PixelRatio.get(),
  },

  itemSuccessIcon: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 8
  },

  // Text styles
  itemInfoMajor: {
    backgroundColor: 'transparent',
    height: 40,
    width: 265,
    fontFamily: _variables.din,
    fontSize: 22,
    color: _variables.white,
  },
});
