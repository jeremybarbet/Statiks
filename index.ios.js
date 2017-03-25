import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import List from './sources/listView/index';
import Add from './sources/addView/index';
import Detail from './sources/detailView/index';

export default class Statiks extends Component {
  render() {
    return (
      <Router hideNavBar={true}>
        <Scene key="root">
          <Scene key="list" component={List} title="Statiks" />
          <Scene key="add" component={Add} title="Options" />
          <Scene key="detail" component={Detail} />
        </Scene>
      </Router>
    );
  }
}

AppRegistry.registerComponent('Statiks', () => Statiks);
