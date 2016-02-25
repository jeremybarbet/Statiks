import React, {
  Dimensions,
  PixelRatio,
  StyleSheet
} from 'react-native';

import _variables from '../_styles/variables';


const { width } = Dimensions.get('window');

export default StyleSheet.create({
  listContainer: {
    paddingTop: 10,
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
    marginTop: 16,
  }
});
