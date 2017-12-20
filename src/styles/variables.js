import { Platform } from 'react-native';

export const v = {
  bgBlue: '#f0f6fa',
  dark: '#143d66',
  graySaturate: '#617385',
  graySaturateLighter: '#b6c6d6',
  lightBlue: '#adc3d9',
  green: '#46c340',
  buttonGreen: '#67d861',
};

export const fonts = {
  regular: {
    fontFamily: 'DIN',
    fontWeight: Platform.select({ android: '300', ios: '400' }),
  },

  medium: {
    fontFamily: 'DIN',
    fontWeight: Platform.select({ android: '400', ios: '500' }),
  },

  bold: {
    fontFamily: 'DIN',
    fontWeight: Platform.select({ android: '600', ios: '700' }),
  },
};
