import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Dimensions, Text, View, TouchableWithoutFeedback } from 'react-native';
import get from 'lodash/get';

import v from 'styles/variables';
import g from 'styles/global';
import { luminosity, colors } from 'utils/colors';

import { icons } from 'Api';
import { DETAIL } from 'screens';

const { width } = Dimensions.get('window');

export default class Item extends Component {

  static propTypes = {
    network: PropTypes.string,
    data: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
  }

  state = {
    imPressed: false,
  }

  render() {
    const { network, data, title, description } = this.props;
    const { imPressed } = this.state;

    const networkName = network || title;
    const base = colors(networkName);
    const darker = luminosity(base, -0.08);
    const pressColor = !imPressed ? base : darker;

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={() => this.handlePress(networkName, data)}
      >
        <View style={[s.item, { backgroundColor: pressColor }]}>
          <View style={s.item__network}>
            <Image
              style={s.item__icon}
              resizeMode="contain"
              source={this.getIcon(networkName)}
            />
          </View>

          <View style={g.inlineBlock}>
            <View style={s.item__left}>
              <Text style={s.item__info}>
                {networkName === 'fivehundredpx' ? '500px' : networkName}
              </Text>

              <Text style={s.item__text}>
                {get(data, 'user.Username') || description}
              </Text>
            </View>

            <View style={s.item__right}>
              <Text style={[s.item__info, g.alignRight]}>{data.stats.Followers}</Text>
              <Text style={[s.item__text, g.alignRight]}>followers</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  getIcon = name => icons.find(n => n.name === name).icon;

  handlePressIn = () => {
    this.setState({ imPressed: !this.state.imPressed });
  }

  handlePressOut = () => {
    this.setState({ imPressed: !this.state.imPressed });
  }

  handlePress = (network, data) => {
    const { navigator } = this.props;

    navigator.showModal({
      screen: DETAIL,
      passProps: {
        network,
        data,
      },
    });
  }
}

const s = StyleSheet.create({
  item: {
    marginHorizontal: 15,
    marginBottom: 15,
    paddingTop: 18,
    paddingBottom: 9,

    width: width - 30,

    borderRadius: 4,
  },

  item__network: {
    paddingLeft: 20,
    marginBottom: 15,
  },

  item__icon: {
    width: 26,
    height: 26,

    tintColor: '#fff',
  },

  item__info: {
    marginBottom: 4,

    fontFamily: v.dinMedium,
    fontSize: 22,
    color: '#fff',
  },

  item__text: {
    opacity: 0.75,

    paddingBottom: 9,

    fontFamily: v.din,
    fontSize: 16,
    color: '#fff',
  },

  item__left: {
    paddingLeft: 20,
  },

  item__right: {
    paddingRight: 20,
  },
});
