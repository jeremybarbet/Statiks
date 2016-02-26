export function luminosity(hex, value) {
  hex = String(hex).replace(/[^0-9a-f]/gi, '');

  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  value = value || 0;

  let rgb = '#';
  let c;
  let i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * value)), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}

export function colors(network) {
  const colors = {
    dribbble: '#ea4c89',
    twitter: '#55acee',
    facebook: '#3b5998',
    behance: '#1769ff',
    cinqcentpx: '#222222',
    github: '#4183c4',
    vimeo: '#1ab7ea',
    instagram: '#3f729b',
    pinterest: '#bd081c',
    youtube: '#cd201f',
    soundcloud: '#ff8800',
    deviantart: '#4dc47d',
    producthunt: '#da552f',
  }

  if (colors[network] !== undefined) {
    return colors[network];
  }
}
