import React from 'react-native';

import _variables from '../_styles/variables';


const {
  Dimensions,
  StyleSheet
} = React;

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  // Item container
  itemContainer: {
    marginHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 9,
    borderRadius: 2,
    marginBottom: 15,
    width: width - 30
  },

  itemIconNetwork: {
    paddingLeft: 20,
    marginBottom: 15,
  },

  // Text styles
  itemInfoMajor: {
    fontFamily: _variables.dinMedium,
    fontSize: 22,
    color: _variables.white,
    marginBottom: 4,
  },

  itemInfoMinor: {
    fontFamily: _variables.din,
    fontSize: 16,
    color: _variables.white,
    opacity: 0.75,
    paddingBottom: 9
  },

  itemInfoLeft: {
    paddingLeft: 20,
  },

  itemInfoRight: {
    paddingRight: 20,
  },

  // Item detail
  itemDetail: {
    backgroundColor: _variables.white,
    marginTop: 9
  },

  itemDetailRow: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: _variables.bgBlue,
  },

  itemDetailRowLast: {
    borderBottomWidth: 0,
  },

  itemDetailRowText: {
    color: _variables.graySaturate,
    paddingBottom: 0,
  },
});
