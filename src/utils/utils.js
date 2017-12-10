// Return the ratio of a division of two number
export function getRatio(a, b) {
  const x = Number(a);
  const y = Number(b);

  if (x === 0 && y === 0) {
    return '1:1';
  }

  if (x > y) {
    return `${Math.ceil(x / y)}:1`;
  }

  return `1:${Math.round(y / x)}`;
}

// Make images src from API with https uri
export function convertToHttps(uri) {
  const protocol = uri.split('://')[0];
  const path = uri.split('://')[1];

  if (protocol === 'http') {
    return `https://${path}`;
  }

  return uri;
}

// Put the first letter of network name in uppercase
export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

// Formatting big numbers
export function format(nbr) {
  return String(nbr).replace(/.(?=(?:.{3})+$)/g, '$& ');
}
