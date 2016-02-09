import React from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import { luminosity, colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';


const {
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
} = React;

const Icon = createIconSetFromFontello(fontelloConfig);

const NetworkDetail = React.createClass({
  _renderRow(data, item, detail, i) {
    const lastItem = Object.keys(data).length - 1 === i ? style.itemDetailRowLast : undefined;

    return (
      <View key={ i } style={[ style.itemDetailRow, global.inlineBlock, lastItem ]}>
        <Text style={[ style.itemInfoMinor, style.itemDetailRowText ]}>{ item }</Text>
        <Text style={[ style.itemInfoMinor, style.itemDetailRowText ]}>{ detail }</Text>
      </View>
    );
  },

  render() {
    const { data } = this.props;

    return (
      <View style={ style.itemDetail }>
        {
          Object.keys(data).filter(item => item !== 'username' && item !== 'followers').map((item, i) => {
            const detail = data[item];
            return this._renderRow(data, item, detail, i);
          })
        }
      </View>
    );
  }
});

export default React.createClass({
  getInitialState() {
    const { network } = this.props;

    return {
      expanded: false,
      darker: colors(network)
    };
  },

  render() {
    const { network, data } = this.props;
    const { darker } = this.state;

    const detail = this.state.expanded ? <NetworkDetail data={ data } /> : undefined;
    const pressColor = darker === colors(network).backgroundColor ? colors(network) : darker;

    let iconSize;
    if (network === 'vimeo') iconSize = 22;
    else iconSize = 26;

    return (
      <TouchableWithoutFeedback  onLongPress={ this._onLongPress } onPressIn={ this._handlePressIn.bind(this, network) } onPressOut={ this._handlePressOut.bind(this, network) } onPress={ this._handlePress }>
        <View style={[ style.itemContainer, { backgroundColor: pressColor } ]}>
          <View>
            <View style={ style.itemIconNetwork }>
              <Icon name={ network } size={ iconSize } color={ _variables.white } />
            </View>

            <View style={ global.inlineBlock }>
              <View style={ style.itemInfoLeft }>
                <Text style={ style.itemInfoMajor }>{ network === 'cinqcentpx' ? '500px' : network }</Text>
                <Text style={ style.itemInfoMinor }>{ data.username }</Text>
              </View>

              <View style={ style.itemInfoRight }>
                <Text style={[ style.itemInfoMajor, global.alignRight ]}>{ data.followers }</Text>
                <Text style={[ style.itemInfoMinor, global.alignRight ]}>followers</Text>
              </View>
            </View>
          </View>

          { detail }
        </View>
      </TouchableWithoutFeedback>
    );
  },

  _onLongPress() {
    console.log('reorder item list');
  },

  _handlePressIn(item) {
    const base = colors(item);
    const darker = luminosity(base, -0.08);

    this.setState({ darker });
  },

  _handlePressOut(item) {
    this.setState({ darker: colors(item) });
  },

  _handlePress() {
    this.setState({ expanded: !this.state.expanded });
  },
});
