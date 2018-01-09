import { Dimensions, Platform } from 'react-native';

const X_WIDTH = 375;
const X_HEIGHT = 812;
const { height, width } = Dimensions.get('window');

export function isIphoneX() {
  return Platform.OS === 'ios' && ((height === X_HEIGHT && width === X_WIDTH) || (height === X_WIDTH && width === X_HEIGHT));
}

export function getRatio(a, b) {
  const x = Number(a);
  const y = Number(b);

  if (x === 0 && y === 0) {
    return '1:1';
  }

  if (x > y) {
    return `${format(Math.ceil(x / y))}:1`;
  }

  return `1:${format(Math.round(y / x))}`;
}

export function convertToHttps(uri) {
  const protocol = uri.split('://')[0];
  const path = uri.split('://')[1];

  if (protocol === 'http') {
    return `https://${path}`;
  }

  return uri;
}

export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export function format(nbr) {
  return String(nbr).replace(/.(?=(?:.{3})+$)/g, '$& ');
}
