import { StyleSheet } from 'react-native';

import _variables from './variables';

export default StyleSheet.create({
  // Layout
  layout: {
    flex: 1,
    backgroundColor: _variables.bgBlue,
  },

  // Paddings
  padding: {
    padding: 25,
  },

  noPaddingBottom: {
    paddingBottom: 0,
  },

  // Backgrounds
  whiteBackground: {
    backgroundColor: _variables.white,
  },

  blueBackground: {
    backgroundColor: _variables.lightessBlue,
  },

  greenBackground: {
    backgroundColor: _variables.bgGreen,
  },

  // Inline block items
  inlineBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Text-align: right
  alignRight: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
});
