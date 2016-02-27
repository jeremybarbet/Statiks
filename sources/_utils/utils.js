/**
* A little function to check if the data contained in a declared variable exists
*/
export function dataIsEmpty(data) {
  let arrayIntoArray = (data instanceof Array) ? data.filter(array => !dataIsEmpty(array)).length === 0 : false;
  return (data === undefined || data === null || data.length === 0 || arrayIntoArray);
};

/**
* Function to display data on detail mission with placeholder when no data
*/
export function dataOrElse(data, empty) {
  return data !== null && data !== undefined ? data : empty;
};

/**
* Some API return html tag in their response (e.g. dribbble about key return <a href="#"></a> for link add)
*/
export function removeTag(s) {
  return s.replace(/(<(?:.|\n)*?>)/g, '');
};

/**
* Put the first letter of network name in uppercase
*/
export function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1);
};

/**
* Formatting big numbers
*/
export function format(nbr) {
  return (nbr + '').replace(/.(?=(?:.{3})+$)/g, '$& ');
};

/**
* Returns the sum of this array of Integers.
*/
export function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
};

/**
* Converts a single hex number to a character
* Note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
*/
export function hex2char(hex) {
  var result = '';
  var n = parseInt(hex, 16);

  if (n <= 0xFFFF) {
    result += String.fromCharCode(n);
  } else if (n <= 0x10FFFF) {
    n -= 0x10000
    result += String.fromCharCode(0xD800 | (n >> 10)) + String.fromCharCode(0xDC00 | (n & 0x3FF));
  } else {
    result += 'hex2Char error: Code point out of range: ' + dec2hex(n);
  }

  return result;
};

/**
* Converts a string containing JavaScript escapes to a string of characters - unicode UTF-8 ready
*/
export function decode(str, shortEscapes) {
  // convert \U and 6 digit escapes to characters
  str = str.replace(/\\U([A-Fa-f0-9]{8})/g, (matchstr, parens) => {
    return hex2char(parens);
  });

  // convert \u and 6 digit escapes to characters
  str = str.replace(/\\u([A-Fa-f0-9]{4})/g, (matchstr, parens) => {
    return hex2char(parens);
  });

  // convert \b etc to characters, if flag set
  if (shortEscapes) {
    str = str.replace(/\\b/g, '\b');
    str = str.replace(/\\t/g, '\t');
    str = str.replace(/\\n/g, '\n');
    str = str.replace(/\\v/g, '\v');
    str = str.replace(/\\f/g, '\f');
    str = str.replace(/\\r/g, '\r');
    str = str.replace(/\\\'/g, '\'');
    str = str.replace(/\\\"/g, '\"');
    str = str.replace(/\\\\/g, '\\');
  }

  return str;
};
