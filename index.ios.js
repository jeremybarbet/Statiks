import React, {
  AppRegistry,
  Navigator
} from 'react-native';

import { Router, Route, Schema } from 'react-native-router-flux';

import List from './sources/list/index';
import Add from './sources/add/index';
import Test from './sources/test';
import UseCase from './sources/useCase';
import Header from './sources/header/index';
import { FloatFromRight } from './sources/_utils/customNavigatorSceneConfigs';


const statiks = React.createClass({
  render() {
    return (
      <Router hideNavBar={ true }>
        <Schema name="default" header={ Header } hideNavBar={ true } sceneConfig={ FloatFromRight } />

        <Route name="list" component={ List } title="Statiks" schema="default" />
        <Route name="add" component={ Add } title="Options" schema="default" />

        <Route name="useCase" component={ UseCase } initial={ true } title="Statiks" schema="default" />
        <Route name="test" component={ Test } title="Statiks" schema="default" />
      </Router>
    );
  }
});

AppRegistry.registerComponent('statiks', () => statiks);
