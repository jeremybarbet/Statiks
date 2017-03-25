/**
* @param {Object} a
* @param {Object} b
* @return {Object}
*/
export function diff(a, b) {
  if (a === b) {
    return {
      changed: 'equal',
      value: a
    }
  }

  let value = {};
  let equal = true;

  for (let key in a) {
    if (key in b) {
      if (a[key] !== b[key]) {
        let typeA = typeof a[key];
        let typeB = typeof b[key];
        let difference;

        if (a[key] && b[key] && (typeA === 'object' || typeA === 'function') && (typeB === 'object' || typeB === 'function')) {
          let valueDiff = diff(a[key], b[key]);

          if (valueDiff.changed === 'equal') {
            value[key] = {
              changed: 'equal'
            }
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
            difference: difference
          }
        }
      }
    } else {
      equal = false;

      value[key] = {
        changed: 'removed',
        value: a[key]
      }
    }
  }

  for (key in b) {
    if (!(key in a)) {
      equal = false;

      value[key] = {
        changed: 'added',
        value: b[key]
      }
    }
  }

  if (equal) {
    return {
      changed: 'equal'
    }
  } else {
    return {
      changed: 'object change',
      value: value
    }
  }
};
