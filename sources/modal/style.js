import React, {
  StyleSheet,
  PixelRatio,
} from 'react-native';

import _variables from '../_styles/variables';


export default StyleSheet.create({
  modalGlobal: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    backgroundColor: _variables.bgBlue,
  },

  /*
  * Modal header
  */
  modalHeader: {
    backgroundColor: '#ea4c89',
    height: 64,
    shadowColor: 'rgb(23, 24, 26)',
    shadowOffset: { height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.04,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,235,245,0.80)',
    backgroundColor: _variables.white,
  },

  modalHeaderArrow: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: 44,
    height: 44,
    top: 30,
    left: 20,
  },

  modalHeaderArrowIcon: {
    color: '#E1EBF5',
  },

  modalHeaderTitle: {
    backgroundColor: 'transparent',
    fontFamily: _variables.dinBold,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
    marginHorizontal: 40
  },

  /*
  * User info
  */

  userInfo: {
    paddingVertical: 40,
  },

  userInfoPhoto: {
    width: 64,
    height: 64,
    borderRadius: 64 / PixelRatio.get(),
    alignSelf: 'center',
    marginBottom: 20,
  },

  userInfoName: {
    fontFamily: _variables.dinBold,
    fontSize: 18,
    color: _variables.dark,
    textAlign: 'center'
  },

  userInfoText: {
    fontFamily: _variables.din,
    fontSize: 16,
    lineHeight: 20,
    color: _variables.lightBlue,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 40,
  },

  userInfoAbout: {
    marginTop: 20,
  },

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
