import { AsyncStorage } from 'react-native';

export default Storage = {
  get(key) {
    return AsyncStorage.getItem(key).then(value => {
      if (value === null || value === undefined) throw 'error';
      return JSON.parse(value);
    });
  },

  save(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },

  actualize(key, value) {
    return Storage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    }, () => {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    }).catch((e) => {
      console.log(e);
    });
  },

  delete(key) {
    return AsyncStorage.removeItem(key);
  },

  clear() {
    return AsyncStorage.clear();
  },
};
