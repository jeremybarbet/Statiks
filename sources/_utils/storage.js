import React from 'react-native';


const { AsyncStorage } = React;

const deviceStorage = {
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
    return deviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    }).catch((e) => {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  },

  delete(key) {
    return AsyncStorage.removeItem(key);
  }
};

export default deviceStorage;
