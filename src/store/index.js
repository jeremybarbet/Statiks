import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { Provider } from 'mobx-react/native';
import { create, persist } from 'mobx-persist';

import Stats from './Stats';

const hydrate = create({
  storage: AsyncStorage,
  jsonify: true,
});

export default class Store {

  @persist('object', Stats)
  stats = new Stats();

  async init() {
    await hydrate('store', this.stats);
    return true;
  }
}

export class StoreProvider extends PureComponent {

  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.node,
  }

  render() {
    const { store, children } = this.props;

    return (
      <Provider stats={store.stats}>
        {children}
      </Provider>
    );
  }
}
