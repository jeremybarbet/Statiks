import { AsyncStorage } from 'react-native';

export default Storage = {
  /**
  * Get a one or more value for a key or array of keys from AsyncStorage
  */
  get(key) {
    if (!Array.isArray(key)) {
      return AsyncStorage.getItem(key).then((value) => {
        return JSON.parse(value);
      });
    }

    return AsyncStorage.multiGet(key).then((values) => {
      return values.map((value) => {
        return JSON.parse(value[1]);
      });
    });
  },

  /**
  * Save a key value pair or a series of key value pairs to AsyncStorage.
  */
  save(key, value) {
    if (!Array.isArray(key)) {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    }

    const pairs = key.map((pair) => [pair[0], JSON.stringify(pair[1])]);
    return AsyncStorage.multiSet(pairs);
  },

  /**
  * Updates the value in the store for a given key in AsyncStorage. If the value is a string it will be replaced. If the value is an object it will be deep merged.
  */
  actualize(key, value) {
    return this.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  },

  /**
  * Delete the value for a given key in AsyncStorage.
  */
  delete(key) {
    return AsyncStorage.removeItem(key);
  },

  /**
  * Get all keys in AsyncStorage.
  */
  keys() {
    return AsyncStorage.getAllKeys();
  },

  /**
  * Remove all the namespaced keys
  */
  clear() {
    return AsyncStorage.clear();
  },
};
