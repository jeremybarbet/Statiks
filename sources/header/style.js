import React from 'react-native';

import _variables from '../_styles/variables';


const {
  StyleSheet
} = React;

const NAV_BAR_HEIGHT = 39;
const STATUS_BAR_HEIGHT = 20;

export default StyleSheet.create({
  /*
  * Global styles
  */
  navBarContainer: {
    backgroundColor: _variables.bgBlue,
    paddingBottom: 5,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  /*
  * Title
  */
  navBarTitleText: {
    fontFamily: _variables.dinMedium,
    fontSize: 16,
    color: _variables.graySaturate,
    letterSpacing: 0.25,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 7,
    textAlign: 'center',
  },

  /*
  * Icons
  */
  navBarButton: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  navBarButtonLeft: {
    marginLeft: 14
  },

  navBarButtonRight: {
    position: 'absolute',
    right: 14,
  },
});
