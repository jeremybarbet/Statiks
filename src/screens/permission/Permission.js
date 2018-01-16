import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';

import { navigatorTypes } from 'utils/types';
import registerNotifications from 'utils/notifications';
import { LIST } from 'screens';

import { Permission } from 'components/Placeholders';

@inject('stats')
@observer
export default class PermissionScreen extends Component {

  static propTypes = {
    ...navigatorTypes,
  }

  static navigatorStyle = {
    navBarHidden: true,
  }

  onPressNotify = async () => {
    await registerNotifications();

    this.props.stats.permission = 'enable';
    this.nextScreen();
  }

  onPressNo = () => {
    this.props.stats.permission = 'disable';
    this.nextScreen();
  }

  nextScreen = () => {
    this.props.navigator.resetTo({ screen: LIST });
  }

  render() {
    return (
      <Permission
        onEnable={this.onPressNotify}
        onDisable={this.onPressNo}
      />
    );
  }
}
