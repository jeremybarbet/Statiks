import React, {
  StyleSheet,
  PixelRatio,
} from 'react-native';

import _variables from '../_styles/variables';


export default StyleSheet.create({
  /*
  * Network data
  */

  itemDetail: {
    flex: 1,
    backgroundColor: _variables.white,
    borderWidth: 1,
    borderColor: '#E1EBF5',
    marginHorizontal: 15,
    borderRadius: 4,
    marginBottom: 15,
  },

  itemTitle: {
    fontFamily: _variables.dinMedium,
    fontSize: 14,
    color: _variables.lightBlue,
    marginLeft: 25,
    marginTop: 30,
    marginBottom: 20,
    letterSpacing: 0.75,
  },

  itemDetailRow: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },

  itemDetailRowText: {
    color: _variables.graySaturate,
    paddingBottom: 0,
  },

  itemDetailLabel: {
    fontFamily: _variables.din,
    fontSize: 14,
    color: _variables.lightBlue,
    marginTop: 4,
  },

  itemDetailNumber: {
    fontFamily: _variables.din,
    fontSize: 24,
    color: _variables.dark,
  },

  itemDetailGrowth: {
    position: 'absolute',
    top: 30,
    right: 25,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },

  itemDetailGrowthNumber: {
    fontFamily: _variables.dinMedium,
    fontSize: 14,
    color: _variables.white,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },

});
