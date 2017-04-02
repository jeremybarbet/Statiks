import { size } from './object';

/**
* Function to retrieve to last change into history of a network
*/
export function getLastChange(obj, data) {
  const lastChange = Object.keys(obj).filter(item => obj[item].changed !== 'equal').last();

  // if (size(obj) !== 0 && lastChange !== undefined && lastChange.length > 0) {
  if (lastChange !== undefined) {
    const changesObj = obj[lastChange].value.stats.value;
    if (changesObj[data] !== undefined) return changesObj[data].difference;
  }
}

/**
* Namespace to manage total object
*/
export default objTotal = {
  result: {},

  /**
  * Method function to init total object
  */
  init(obj) {
    for (const key in obj) { // eslint-disable-line
      if (this.result.hasOwnProperty(key)) this.result[key] += parseInt(obj[key], 10);
      else this.result[key] = parseInt(obj[key], 10);
    }

    return this.result;
  },

  /**
  * Return a diff with new values compared between old data and new data updated
  */
  update(current, old) {
    // console.log('%c -------TOTAL---------', 'background: blue; color: white');
    // console.log(current);
    // console.log(old.history);

    if (size(old.history) !== 0) {
      // console.log('There is some history');

      Object.keys(current).map((item) => {
        /**
        * There is a issue with diff value after first
        * reload/changed values. It seems to do not be recognized after refresh data
        */
        // console.log(getLastChange(old.history, item));

        if (getLastChange(old.history, item) !== undefined) {
          // console.log('%c --------TOTAL--------', 'background: red; color: white');
          // console.log('need to update stats');
          // console.log(item);
          // console.log(getLastChange(old.history, item));

          // console.log('------------------');
          // console.log('before');
          // console.log(current);

          if (current.hasOwnProperty(item)) {
            current[item] += parseInt(getLastChange(old.history, item), 10);
          }
          // else this.result[key] = parseInt(obj[key], 10);

          // console.log('------------------');
          // console.log('after');
          // console.log(current);
          // console.log('%c --------TOTAL--------', 'background: red; color: white');

          return current;
        }

        return null;
      });

      // for (let key in current) {
      //   if (this.result.hasOwnProperty(key)) {
      //     // console.log();
      //   } else {

      //   }

        // if (this.result.hasOwnProperty(key)) this.result[key] += parseInt(current[key], 10);
        // else this.result[key] = parseInt(current[key], 10);

      // }
    }
  },

  /**
  * Method function to update current total object
  * Add or subtract the difference before refreshing and after results of new data
  */
  api(network, stats, array, current) {
    if (current !== undefined && array.indexOf(network) > -1) {
      // console.log('Update object with diff value');
      this.update(stats, current);
    } else {
      // console.log('Init object with network stats');
      return this.init(stats);
    }
  },

  /**
  * Return new total object after subtracted item data
  */
  subtract(obj, item) {
    for (const key in item) {
      if (obj.hasOwnProperty(key)) obj[key] -= parseInt(item[key], 10);
    }

    return obj;
  },
};
