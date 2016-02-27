import React, {
  AppRegistry,
  Navigator
} from 'react-native';

import { Router, Route, Schema } from 'react-native-router-flux';

import Header from './sources/header/index';
import List from './sources/listView/index';
import Add from './sources/addView/index';
import Detail from './sources/detailView/index';
import { FloatFromRight, FloatFromBottom } from './sources/_utils/sceneConfigs';


const statiks = React.createClass({
  render() {
    return (
      <Router hideNavBar={ true }>
        <Schema name="default" header={ Header } hideNavBar={ true } sceneConfig={ FloatFromRight } />
        <Schema name="detail" hideNavBar={ true } sceneConfig={ FloatFromBottom } />

        <Route name="list" component={ List } title="Statiks" schema="default" />
        <Route name="add" component={ Add } title="Options" schema="default" />
        <Route name="detail" component={ Detail } schema="detail" />
      </Router>
    );
  }
});

AppRegistry.registerComponent('statiks', () => statiks);
