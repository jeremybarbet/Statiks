import { PixelRatio, StyleSheet } from 'react-native';

import _variables from '../_styles/variables';

export default StyleSheet.create({
  // Global
  itemFeedback: {
    position: 'absolute',
  },

  itemIcon: {
    backgroundColor: 'transparent',
    textAlign: 'center',
  },

  // Loading
  itemLoading: {
    top: 10,
    left: 45,
  },

  // Success
  itemSuccess: {
    top: 6,
    left: 45,
    backgroundColor: _variables.white,
    width: 26,
    height: 26,
    borderRadius: 26 / PixelRatio.get(),
  },

  itemSuccessIcon: {
    marginTop: 9,
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
});
