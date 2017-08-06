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
    _networksArray,
    sync,
    total,
  ) {
    const _detail = details(response);
    const newObj = obj;
    let newArr = _networksArray;
    let isUpdated = false;

    /**
    * Init the network object with stats and history if existing
    */
    newObj.objNetwork[network] = {
      data: _detail,
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
      const _diff = diff(data, _detail);

      isUpdated = _diff.changed === 'object change';
      newObj._timestampDiff[sync] = _diff;
      assign(newObj.objNetwork[network].history, newObj._timestampDiff);
      assign(newObj.objNetwork[network], newObj.objHistory);
    }

    /**
    * Create a total object to sum up all
    * the data of networks connected.
    */
    newObj._total = {
      total: {
        stats: objTotal.api(
          network,
          _detail.stats,
          newArr,
          current,
          total,
          isUpdated,
        ) || total.stats,
        networks: newArr,
        user: 'total',
      },
    };

    /**
    * Only push once the network name into the array,
    * Next push the array to the total object.
    */
    newArr.pushOnce(network);
    newObj._total.total.networks = newArr;

    assign(newObj.objNetwork, newObj._total);
    Storage.actualize('userData', newObj.objNetwork);

    return {
      state: 'success',
      data: newObj.objNetwork,
    };
  },
};

export default ApiUtils;
