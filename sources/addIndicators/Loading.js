import React, { Component, PropTypes } from 'react';
import { ActivityIndicator } from 'react-native';

import _variables from '../_styles/variables';
import style from './style';

export default class Loading extends Component {

  static propTypes = {
    loaded: PropTypes.bool,
  };

  render() {
    return (
      <ActivityIndicator
        style={[style.itemFeedback, style.itemLoading]}
        animating={this.props.loaded}
        color={_variables.white}
        hidesWhenStopped
        size="small"
      />
    );
  }
}
