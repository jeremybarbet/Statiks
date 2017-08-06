import { size } from 'lodash';

const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
* Function to retrieve to last change into history of a network
*/
export function getLastChange(obj, data) {
  const lastChange = Object.keys(obj).filter(item => obj[item].changed !== 'equal').last();

  if (lastChange !== undefined) {
    const changesObj = obj[lastChange].value.stats.value;
    if (changesObj[data] !== undefined) return changesObj[data].difference;
  }
}

/**
* Namespace to manage total object
*/
const objTotal = {
  result: {},

  /**
  * Method function to init total object
  */
  init(obj) {
    for (const key in obj) { // eslint-disable-line
      if (hasProp(this.result, key)) {
        this.result[key] += parseInt(obj[key], 10);
      } else {
        this.result[key] = parseInt(obj[key], 10);
      }
    }

    return this.result;
  },

  /**
  * Return a diff with new values compared between old data and new data updated
  */
  update(current, old, total) {
    const newTotal = total;

    if (size(old.history) !== 0) {
      Object.keys(current).map((item) => { // eslint-disable-line
        const diff = getLastChange(old.history, item);

        if (diff !== undefined && hasProp(current, item)) {
          if (diff > 0) {
            newTotal[item] += diff;
          } else {
            newTotal[item] -= Math.abs(diff);
          }
        }
      });
    }

    return newTotal;
  },

  /**
  * Method function to update current total object
  * Add or subtract the difference before refreshing and after results of new data
  */
  api(network, stats, array, current, total, isUpdated) {
    const hasCurrent = current !== null;

    if (!isUpdated && hasCurrent) return;

    if (hasCurrent && array.indexOf(network) > -1) {
      return this.update(stats, current, total.stats);
    }

    return this.init(stats);
  },

  /**
  * Return new total object after subtracted item data
  */
  subtract(obj, item) {
    const newObj = obj;

    for (const key in item) { // eslint-disable-line
      if (hasProp(newObj, key)) newObj[key] -= parseInt(item[key], 10);
    }

    return newObj;
  },
};

export default objTotal;
