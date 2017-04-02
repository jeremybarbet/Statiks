/**
* Function to check is the username is stored before submiting with api request
*
function isUsernameStore(input, store, network) {
  const isExist = store[network] !== '' ? store[network].data.user.Username : undefined;
  const valuedStored = store !== '' ? isExist : undefined;

  return input !== undefined && input !== valuedStored;
}

/**
* Return the ratio of a division of two number
*/
export function ratio(a, b) {
  const x = Number(a);
  const y = Number(b);

  if (x > y) {
    return `${Math.ceil(x / y)}:1`;
  }

  return `1:${Math.round(y / x)}`;
}

/**
* Some API return html tag in their response
* (e.g. dribbble about key return <a href="#"></a> for link add)
*/
export function removeTag(s) {
  return s.replace(/(<(?:.|\n)*?>)/g, '');
}

/**
* Make images src from API with https uri
*/
export function convertToHttps(uri) {
  const protocol = uri.split('://')[0];
  const path = uri.split('://')[1];

  if (protocol === 'http') {
    return `https://${path}`;
  }

  return uri;
}

/**
* Put the first letter of network name in uppercase
*/
export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

/**
* Formatting big numbers
*/
export function format(nbr) {
  return String(nbr).replace(/.(?=(?:.{3})+$)/g, '$& ');
}

/**
* Converts a single hex number to a character
* Note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
*/
export function hex2char(hex) {
  let result = '';
  let n = parseInt(hex, 16);

  if (n <= 0xFFFF) {
    result += String.fromCharCode(n);
  } else if (n <= 0x10FFFF) {
    n -= 0x10000;
    result += String.fromCharCode(0xD800 | (n >> 10)) + String.fromCharCode(0xDC00 | (n & 0x3FF)); // eslint-disable-line
  } else {
    result += `hex2Char error: Code point out of range: dec2hex(${n})`;
  }

  return result;
}

/**
* Converts a string containing JavaScript escapes to a string of characters - unicode UTF-8 ready
*/
export function decode(str, shortEscapes) {
  let strToDecode = str;

  // convert \U and 6 digit escapes to characters
  strToDecode = strToDecode.replace(/\\U([A-Fa-f0-9]{8})/g, (matchstr, parens) => hex2char(parens));

  // convert \u and 6 digit escapes to characters
  strToDecode = strToDecode.replace(/\\u([A-Fa-f0-9]{4})/g, (matchstr, parens) => hex2char(parens));

  // convert \b etc to characters, if flag set
  if (shortEscapes) {
    strToDecode = strToDecode.replace(/\\b/g, '\b');
    strToDecode = strToDecode.replace(/\\t/g, '\t');
    strToDecode = strToDecode.replace(/\\n/g, '\n');
    strToDecode = strToDecode.replace(/\\v/g, '\v');
    strToDecode = strToDecode.replace(/\\f/g, '\f');
    strToDecode = strToDecode.replace(/\\r/g, '\r');
    strToDecode = strToDecode.replace(/\\\'/g, '\''); // eslint-disable-line
    strToDecode = strToDecode.replace(/\\\"/g, '\"'); // eslint-disable-line
    strToDecode = strToDecode.replace(/\\\\/g, '\\');
  }

  return strToDecode;
}
