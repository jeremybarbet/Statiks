export function removeTag(s) {
  return s.replace(/(<(?:.|\n)*?>)/g, '');
}

export function capitalize(string) {
  return string && string[0].toUpperCase() + string.slice(1);
}

// export function decode_utf8(string) {
//   return decodeURIComponent(escape(string));
// }

// export function Utf8Decode(input) {
//   let string = input.replace(
//     /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,

//     function(c) {
//       let cc = ((c.charCodeAt(0) & 0x0f) << 12) | ((c.charCodeAt(1) & 0x3f) << 6) | ( c.charCodeAt(2) & 0x3f);
//       return String.fromCharCode(cc);
//     }
//   );

//   string = string.replace(
//     /[\u00c0-\u00df][\u0080-\u00bf]/g,

//     function(c) {
//       let cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
//       return String.fromCharCode(cc);
//     }
//   );

//   return string;
// }
