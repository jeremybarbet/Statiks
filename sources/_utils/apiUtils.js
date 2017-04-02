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

    /**
    * Init the network object with stats and history if existing
    */
    obj.objNetwork[network] = {
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
    // console.log(objTotal.api(network, _detail.stats, _networksArray, current) || total.stats)

    /*
    obj._total = {
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

      obj._timestampDiff[sync] = _diff;
      extend(obj.objNetwork[network].history, obj._timestampDiff);
      extend(obj.objNetwork[network], obj.objHistory);
    }

    /**
    * Only push once the network name into the array,
    * Next push the array to the total object.
    */
    // _networksArray.pushOnce(network);
    // obj._total['total'].networks = _networksArray;

    // console.log(obj.objNetwork);
    // console.log(_networksArray);
    // extend(obj.objNetwork, obj._total);
    Storage.actualize('userData', obj.objNetwork);

    return {
      state: 'success',
      data: obj.objNetwork,
    };
  },
};
