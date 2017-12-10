import { StyleSheet } from 'react-native';

import v from './variables';

export default StyleSheet.create({
  // Layout
  layout: {
    flex: 1,
    backgroundColor: v.bgBlue,
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
    backgroundColor: '#fff',
  },

  blueBackground: {
    backgroundColor: v.lightessBlue,
  },

  greenBackground: {
    backgroundColor: v.bgGreen,
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
