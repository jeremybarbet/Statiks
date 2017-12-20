import { v } from 'styles/variables';

export function luminosity(hex, value) {
  let hexValue = hex;

  hexValue = String(hexValue).replace(/[^0-9a-f]/gi, '');

  if (hexValue.length < 6) {
    hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2];
  }

  let rgb = '#';
  let c;
  let i;

  for (i = 0; i < 3; i++) { // eslint-disable-line
    c = parseInt(hexValue.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * (value || 0))), 255)).toString(16);
    rgb += (`00${c}`).substr(c.length);
  }

  return rgb;
}

export function colors(network) {
  const list = {
    total: v.graySaturate,
    dribbble: '#ea4c89',
    twitter: '#55acee',
    facebook: '#3b5998',
    behance: '#1769ff',
    fivehundredpx: '#222222',
    github: '#4183c4',
    vimeo: '#1ab7ea',
    instagram: '#3f729b',
    pinterest: '#bd081c',
    youtube: '#cd201f',
    soundcloud: '#ff8800',
    deviantart: '#4dc47d',
    producthunt: '#da552f',
  };

  if (list[network] !== undefined) {
    return list[network];
  }
}
