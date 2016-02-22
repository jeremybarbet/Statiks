import React, {
  AppRegistry,
  Navigator
} from 'react-native';

import { Router, Route, Schema } from 'react-native-router-flux';

import List from './sources/list/index';
import Add from './sources/add/index';
import Modal from './sources/modal/index';
import Header from './sources/header/index';
import { FloatFromRight, FloatFromBottom } from './sources/_utils/sceneConfigs';


const statiks = React.createClass({
  render() {
    return (
      <Router hideNavBar={ true }>
        <Schema name="default" header={ Header } hideNavBar={ true } sceneConfig={ FloatFromRight } />
        <Schema name="modal" hideNavBar={ true } sceneConfig={ FloatFromBottom } />

        <Route name="list" component={ List } title="Statiks" schema="default" />
        <Route name="add" component={ Add } title="Options" schema="default" />
        <Route name="modal" component={ Modal } title="Modal" schema="modal" />
      </Router>
    );
  }
});

AppRegistry.registerComponent('statiks', () => statiks);
