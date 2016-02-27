import React, {
  ActivityIndicatorIOS,
  TouchableOpacity,
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';

import _variables from '../_styles/variables';
import style from './style';

import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';


const Icon = createIconSetFromFontello(fontelloConfig);

export const Loading = React.createClass({
  render() {
    return (
      <ActivityIndicatorIOS
        style={[ style.itemFeedback, style.itemLoading ]}
        animating={ this.props.loaded }
        color={ _variables.white }
        hidesWhenStopped
        size="small"
      />
    );
  }
});

export const Success = React.createClass({
  render() {
    return (
      <TouchableOpacity
        activeOpacity={ 0.85 }
        style={[ style.itemFeedback, style.itemSuccess ]}
      >
        <Icon
          style={[ style.itemIcon, style.itemSuccessIcon ]}
          name="check"
          color={ colors(this.props.network) }
          size={ 10 }
        />
      </TouchableOpacity>
    );
  }
});

export const Remove = React.createClass({
  render() {
    return (
      <TouchableOpacity
        activeOpacity={ 0.85 }
        style={[ style.itemFeedback, style.itemRemove ]}
        onPress={ this.props.onPress }
      >
        <Icon
          style={[ style.itemIcon, style.itemRemoveIcon ]}
          name="cross"
          color={ colors(this.props.network) }
          size={ 8 }
        />
      </TouchableOpacity>
    );
  }
});