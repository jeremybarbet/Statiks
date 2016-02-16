import React, {
  PixelRatio,
  StyleSheet
} from 'react-native';

import _variables from '../_styles/variables';


export default StyleSheet.create({
  // Item container
  itemContainer: {
    marginHorizontal: 15,
    paddingLeft: 20,
    paddingVertical: 15,
    borderRadius: 2,
    marginBottom: 15,
  },

  /*
  * Feedback icons
  */

  // Global
  itemFeedback: {
    position: 'absolute',
  },

  itemIcon: {
    backgroundColor: 'transparent',
    textAlign: 'center',
  },

  // Success
  itemSuccess: {
    top: 10,
    left: 45,
    backgroundColor: _variables.white,
    width: 26,
    height: 26,
    borderRadius: 26 / PixelRatio.get(),
  },

  itemSuccessIcon: {
    marginTop: 8,
  },

  // Remove
  itemRemove: {
    top: 10,
    right: 18,
    backgroundColor: _variables.white,
    width: 18,
    height: 18,
    borderRadius: 18 / PixelRatio.get(),
  },

  itemRemoveIcon: {
    marginTop: 5,
  },

  // Text styles
  itemInfoMajor: {
    backgroundColor: 'transparent',
    height: 40,
    width: 240,
    fontFamily: _variables.din,
    fontSize: 22,
    color: _variables.white,
  },
});
