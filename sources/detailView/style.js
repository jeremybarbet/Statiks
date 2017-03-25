import { StyleSheet, PixelRatio } from 'react-native';

import _variables from '../_styles/variables';

export default StyleSheet.create({
  detailGlobal: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    backgroundColor: _variables.bgBlue,
  },

  /*
  * Detail header
  */
  detailHeader: {
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

  detailHeaderArrow: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 16,
    left: 10,
  },

  detailHeaderArrowIcon: {
    color: '#CAD8E6',
    padding: 14,
  },

  detailHeaderReload: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10,
    right: 10,
  },

  detailHeaderReloadIcon: {
    color: '#CAD8E6',
    padding: 14,
  },

  detailHeaderTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 23,
    alignSelf: 'center',
  },

  detailHeaderTitleName: {
    backgroundColor: 'transparent',
    fontFamily: _variables.dinBold,
    fontSize: 16,
    marginLeft: 4,
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
  },

  userInfoName: {
    backgroundColor: 'transparent',
    fontFamily: _variables.dinBold,
    fontSize: 18,
    color: _variables.dark,
    textAlign: 'center',
    marginTop: 20,
  },

  userInfoText: {
    backgroundColor: 'transparent',
    fontFamily: _variables.din,
    fontSize: 16,
    color: _variables.lightBlue,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 40,
  },

  userInfoAbout: {
    marginTop: 20,
    fontSize: 14,
    lineHeight: 22,
  },

  /*
  * Sync date
  */

  itemSyncTime: {
    backgroundColor: 'transparent',
    fontFamily: _variables.din,
    fontSize: 12,
    color: _variables.lightBlue,
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 40,
    marginBottom: 20
  },

});
