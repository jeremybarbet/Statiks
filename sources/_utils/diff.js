export function diff(a, b) {
  if (a === b) {
    return {
      changed: 'equal',
      value: a,
    };
  }

  const value = {};
  let equal = true;

  for (const key in a) { // eslint-disable-line
    if (key in b) {
      if (a[key] !== b[key]) {
        const typeA = typeof a[key];
        const typeB = typeof b[key];

        let difference;

        if (a[key] && b[key] && (typeA === 'object' || typeA === 'function') && (typeB === 'object' || typeB === 'function')) {
          const valueDiff = diff(a[key], b[key]);

          if (valueDiff.changed === 'equal') {
            value[key] = {
              changed: 'equal',
            };
          } else {
            equal = false;
            value[key] = valueDiff;
          }
        } else {
          equal = false;

          if (typeA === 'number' && typeB === 'number') {
            difference = b[key] - a[key];
          }

          value[key] = {
            removed: a[key],
            added: b[key],
            difference,
          };
        }
      }
    } else {
      equal = false;

      value[key] = {
        changed: 'removed',
        value: a[key],
      };
    }
  }

  for (const key in b) { // eslint-disable-line
    if (!(key in a)) {
      equal = false;

      value[key] = {
        changed: 'added',
        value: b[key],
      };
    }
  }

  if (equal) {
    return {
      changed: 'equal',
    };
  }

  return {
    changed: 'object change',
    value,
  };
}
