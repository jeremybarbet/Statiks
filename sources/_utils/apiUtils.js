import { get, assign, size } from 'lodash';

import objTotal from './total';
import { diff } from './diff';
import Storage from './storage';

const ApiUtils = {

  checkStatus(response, username, network) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 404) {
      throw new Error(`${username} not found for ${network}.`);
    } else {
      throw new Error('It seems something went wrong !');
    }
  },

  returnResponse(response) {
    if (response.headers.get('Content-Type').indexOf('application/json') > -1) return response.json();
    return response.text();
  },

  storeData(
    response,
    obj,
    network,
    details,
    current,
    networks,
    sync,
    total,
  ) {
    const detail = details(response);
    const newObj = obj;
    let newArr = networks;
    let isUpdated = false;

    /**
    * Init the network object with stats and history if existing
    */
    newObj.network[network] = {
      data: detail,
      history: get(current, 'history') || {},
    };

    /**
    * Populate the networks array.
    * If total object already exists, concat it with
    * networks array, else just init with the empty array.
    */
    newArr = (total !== undefined && size(newArr) === 0)
      ? newArr.concat(total.networks)
      : newArr;

    /**
    * If fetchy function is called with current argument
    * we will check the diff of old and new stats.
    */
    if (get(current, 'data')) {
      const { data } = current;
      const diffs = diff(data, detail);

      isUpdated = diffs.changed === 'object change';
      newObj.timestamp[sync] = diffs;
      assign(newObj.network[network].history, newObj.timestamp);
      assign(newObj.network[network], newObj.history);
    }

    /**
    * Create a total object to sum up all
    * the data of networks connected.
    */
    newObj.total = {
      total: {
        stats: objTotal.api(
          network,
          detail.stats,
          newArr,
          current,
          total,
          isUpdated,
        ),
        networks: newArr,
        user: 'total',
      },
    };

    /**
    * Only push once the network name into the array,
    * Next push the array to the total object.
    */
    newArr.pushOnce(network);
    newObj.total.total.networks = newArr;

    assign(newObj.network, newObj.total);
    Storage.actualize('userData', newObj.network);

    return {
      state: 'success',
      data: newObj.network,
    };
  },
};

export default ApiUtils;
