// import objTotal from './total';
import { diff } from './diff';
// import { size } from './array';
import { extend, read } from './object';
import Storage from './storage';

export default ApiUtils = {
  checkStatus(response, username, network) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 404) {
      throw `${username} not found for ${network}.`;
    } else {
      throw 'It seems something went wrong !';
    }
  },

  returnResponse(response) {
    if (response.headers.get('Content-Type').indexOf('application/json') > -1) return response.json();
    return response.text();
  },

  storeData(response, objNetwork, network, details, current, _networksArray, sync, total, _total, _timestampDiff, objHistory) {
    const _detail = details(response);

    /**
    * Init the network object with stats and history if existing
    */
    objNetwork[network] = {
      data: _detail,
      history: read(current, 'history') || {},
    };

    /**
    * Populate the networks array.
    * If total object already exists, concat it with networks array, else just init with the empty array.
    */
    // _networksArray = (total !== undefined && size(_networksArray) === 0) ? _networksArray.concat(total.networks) : _networksArray;

    /**
    * Create a total object to sum up all the data of networks connected.
    */
    /*
    _total = {
      total: {
        // stats: objTotal.api(network, _detail.stats, _networksArray, current) || total.stats,
        // stats: objTotal.actualize(network, _detail.stats, _networksArray, current) || {},
        networks: _networksArray,
        user: 'to_create'
      }
    };
    */

    /**
    * If fetchy function is called with current argument we will check the diff of old and new stats.
    */
    if (read(current, 'data')) {
      const { data } = current;
      const _diff = diff(data, _detail);

      _timestampDiff[sync] = _diff;
      extend(objNetwork[network].history, _timestampDiff);
      extend(objNetwork[network], objHistory);
    }

    /**
    * Only push once the network name into the array,
    * Next push the array to the total object.
    */
    // _networksArray.pushOnce(network);
    // _total['total'].networks = _networksArray;

    // console.log(objNetwork);
    // console.log(_networksArray);
    // extend(objNetwork, _total);
    Storage.actualize('userData', objNetwork);

    return {
      state: 'success',
      data: objNetwork,
    }
  },
};
