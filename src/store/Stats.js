import { Sentry } from 'react-native-sentry';
import { observable, ObservableMap, computed, toJS } from 'mobx';
import { persist } from 'mobx-persist';
import isNil from 'lodash/isNil';

import { api, checkStatus, getResponse, handleResponse } from 'Api';

function reduceVal(arr, val, type) {
  return arr
    .filter(c => !isNil(c.stats[val]))
    .map(c => c.stats[val][type])
    .reduce((a, b) => Number(a) + Number(b), 0);
}

export default class Stats {

  @persist('map')
  @observable
  data = new ObservableMap();

  @persist('object')
  @observable
  status = {
    loading: false,
    error: false,
    success: false,
  }

  @computed
  get all() {
    return this.data.entries();
  }

  @computed
  get values() {
    return this.data.values();
  }

  @computed
  get total() {
    const val = this.values;

    return {
      stats: {
        followers: {
          count: reduceVal(val, 'followers', 'count'),
          diff: reduceVal(val, 'followers', 'diff'),
        },
        following: {
          count: reduceVal(val, 'following', 'count'),
          diff: reduceVal(val, 'following', 'diff'),
        },
      },
    };
  }

  getStat = (n) => {
    if (this.data.has(n)) {
      return this.data.get(n);
    }
  }

  getUsername = (n) => {
    if (this.data.has(n)) {
      return this.data.get(n).user.username;
    }
  }

  fetch = (u, n) => {
    this.status.loading = true;

    return fetch(api[n](u))
      .then(res => checkStatus(res, n, u))
      .then(res => getResponse(res))
      .then(res => handleResponse[n](res, u))
      .then((res) => {
        this.status = {
          loading: false,
          success: true,
          error: false,
        };

        if (this.data.has(n)) {
          this.data.set(n, {
            ...res,
            ...Object.keys(res.stats).forEach(v => // eslint-disable-line
              res.stats[v].diff = res.stats[v].count - this.data.get(n).stats[v].count,
            ),
          });
        } else {
          this.data.set(n, {
            ...res,
            ...Object.keys(res.stats).forEach(v => { // eslint-disable-line
              res.stats[v].count = parseInt(res.stats[v].count, 10);
              res.stats[v].diff = 0;
            }),
          });
        }
      })
      .catch((err) => {
        if (!__DEV__) {
          Sentry.captureMessage(err);
        }

        this.status = {
          loading: false,
          success: false,
          error: err,
        };
      });
  }

  updateAll = async () => {
    const parsed = toJS(this.data);

    await Promise.all(
      Object.keys(parsed).map(network =>
        this.fetch(parsed[network].user.username, network),
      ),
    );
  }

  delete = (n) => {
    if (this.data.has(n)) {
      this.data.delete(n);
    }
  }
}
