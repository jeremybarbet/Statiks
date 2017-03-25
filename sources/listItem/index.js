import React, { Component } from 'react';
import { ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Actions } from 'react-native-router-flux';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import { luminosity, colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

export default class ListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      darker: colors(props.network),
    }
  }

  render() {
    const { network, data, sync, history, title, description } = this.props;
    const { darker } = this.state;

    const networkName = network || title;
    const pressColor = darker === colors(networkName).backgroundColor ? colors(networkName) : darker;
    const iconSize = (networkName === 'vimeo') ? 22 : 26;

    return (
      <TouchableWithoutFeedback
        onLongPress={ this._onLongPress.bind(this, networkName) }
        onPressIn={ this._handlePressIn.bind(this, networkName) }
        onPressOut={ this._handlePressOut.bind(this, networkName) }
        onPress={ this._handlePress.bind(this, networkName, data, sync, history) }
      >
        <View style={[ style.itemContainer, { backgroundColor: pressColor } ]}>
          <View>
            <View style={ style.itemIconNetwork }>
              <Icon name={ networkName } size={ iconSize } color={ _variables.white } />
            </View>

            <View style={ global.inlineBlock }>
              <View style={ style.itemInfoLeft }>
                <Text style={ style.itemInfoMajor }>{ networkName === 'fivehundredpx' ? '500px' : networkName }</Text>
                <Text style={ style.itemInfoMinor }>{ data.user.Username || description }</Text>
              </View>

              <View style={ style.itemInfoRight }>
                <Text style={[ style.itemInfoMajor, global.alignRight ]}>{ data.stats.Followers }</Text>
                <Text style={[ style.itemInfoMinor, global.alignRight ]}>followers</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  _onLongPress = (network) => {
    // Re-order
  }

  _handlePressIn = (item) => {
    const base = colors(item);
    const darker = luminosity(base, -0.08);

    this.setState({ darker });
  }

  _handlePressOut = (item) => {
    this.setState({ darker: colors(item) });
  }

  _handlePress = (network, data, sync, history) => {
    Actions.detail({ network, data, sync, history });
  }
}
