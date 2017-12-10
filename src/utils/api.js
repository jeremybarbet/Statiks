// Converts a single hex number to a character
// Note that no checking is performed to ensure that this is just a hex number, eg. no spaces etc
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

// Some API return html tag in their response
// (e.g. dribbble about key return <a href="#"></a> for link add)
export function removeTag(s) {
  return s.replace(/(<(?:.|\n)*?>)/g, '');
}

// Converts a string containing JavaScript escapes to a string of characters - unicode UTF-8 ready
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
