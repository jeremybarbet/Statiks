import React, {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Actions } from 'react-native-router-flux';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import { luminosity, colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';


const Icon = createIconSetFromFontello(fontelloConfig);

export default React.createClass({
  getInitialState() {
    const { network } = this.props;

    return {
      expanded: false,
      darker: colors(network)
    };
  },

  render() {
    const { network, data, sync } = this.props;
    const { darker } = this.state;

    const pressColor = darker === colors(network).backgroundColor ? colors(network) : darker;

    let iconSize;
    if (network === 'vimeo') iconSize = 22;
    else iconSize = 26;

    return (
      <TouchableWithoutFeedback
        onLongPress={ this._onLongPress.bind(this, network) }
        onPressIn={ this._handlePressIn.bind(this, network) }
        onPressOut={ this._handlePressOut.bind(this, network) }
        onPress={ this._handlePress.bind(this, network, data, sync) }
      >
        <View style={[ style.itemContainer, { backgroundColor: pressColor } ]}>
          <View>
            <View style={ style.itemIconNetwork }>
              <Icon name={ network } size={ iconSize } color={ _variables.white } />
            </View>

            <View style={ global.inlineBlock }>
              <View style={ style.itemInfoLeft }>
                <Text style={ style.itemInfoMajor }>{ network === 'cinqcentpx' ? '500px' : network }</Text>
                <Text style={ style.itemInfoMinor }>{ data.Username }</Text>
              </View>

              <View style={ style.itemInfoRight }>
                <Text style={[ style.itemInfoMajor, global.alignRight ]}>{ data.Followers }</Text>
                <Text style={[ style.itemInfoMinor, global.alignRight ]}>followers</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  _onLongPress(network) {
    // Re-order
  },

  _handlePressIn(item) {
    const base = colors(item);
    const darker = luminosity(base, -0.08);

    this.setState({ darker });
  },

  _handlePressOut(item) {
    this.setState({ darker: colors(item) });
  },

  _handlePress(network, data, sync) {
    Actions.modal({ network, data, sync });
  },
});
