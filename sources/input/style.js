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
    borderRadius: 4,
    marginBottom: 15,
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
