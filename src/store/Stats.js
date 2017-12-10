import { observable, ObservableMap, computed, toJS } from 'mobx';
import { persist } from 'mobx-persist';
import isNil from 'lodash/isNil';

import { api, checkStatus, getResponse, handleResponse } from 'Api';

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
    const Followers = this.values
      .filter(c => !isNil(c.stats.Followers))
      .map(c => c.stats.Followers)
      .reduce((a, b) => Number(a) + Number(b), 0);

    const Following = this.values
      .filter(c => !isNil(c.stats.Following))
      .map(c => c.stats.Following)
      .reduce((a, b) => Number(a) + Number(b), 0);

    return {
      stats: {
        Followers,
        Following,
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
      return this.data.get(n).user.Username;
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

        this.data.set(n, res);

        return res;
      })
      .catch((err) => {
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
        this.fetch(parsed[network].user.Username, network),
      ),
    );
  }

  delete = (n) => {
    if (this.data.has(n)) {
      this.data.delete(n);
    }
  }
}
