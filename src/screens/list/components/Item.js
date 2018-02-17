import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Dimensions, Text, View, TouchableWithoutFeedback } from 'react-native';
import { computed } from 'mobx';
import get from 'lodash/get';

import { format } from 'utils/utils';
import { luminosity, colors } from 'utils/colors';
import icons from 'utils/icons';

import { fonts } from 'Theme';

const { width } = Dimensions.get('window');

export default class Item extends Component {

  static propTypes = {
    network: PropTypes.string,
    data: PropTypes.object,
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
  }

  state = {
    imPressed: false,
  }

  @computed
  get someUpdate() {
    const { stats } = this.props.data;

    const diff = Object.keys(stats)
      .map(c => stats[c].diff !== 0)
      .filter(c => c !== false);

    return Boolean(diff.length > 0);
  }

  getIcon = name => icons.find(n => n.name === name).icon;

  handlePressIn = () => {
    this.setState({ imPressed: !this.state.imPressed });
  }

  handlePressOut = () => {
    this.setState({ imPressed: !this.state.imPressed });
  }

  render() {
    const { network, data, title, description, onPress } = this.props;
    const { imPressed } = this.state;

    const networkName = network || title;
    const base = colors(networkName);
    const darker = luminosity(base, -0.08);
    const pressColor = !imPressed ? base : darker;

    return (
      <TouchableWithoutFeedback
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
        onPress={() => onPress(networkName, data)}
      >
        <View style={[s.item, { backgroundColor: pressColor }]}>
          <View style={s.item__network}>
            <Image
              style={s.item__icon}
              resizeMode="contain"
              source={this.getIcon(networkName)}
            />
          </View>

          {this.someUpdate && <View style={s.item__unread} />}

          <View style={s.item__inline}>
            <View style={s.item__left}>
              <Text style={s.item__info}>
                {networkName === 'fivehundredpx' ? '500px' : networkName}
              </Text>

              <Text style={s.item__text}>
                {get(data, 'user.username') || description}
              </Text>
            </View>

            <View style={s.item__right}>
              <Text style={[s.item__info, s.item__infoRight]}>
                {format(data.stats.followers.count)}
              </Text>

              <Text style={[s.item__text, s.item__infoRight]}>followers</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
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

    ...fonts.medium,
    fontSize: 22,
    color: '#fff',
  },

  item__infoRight: {
    textAlign: 'right',
    alignSelf: 'flex-end',
  },

  item__text: {
    opacity: 0.75,

    paddingBottom: 9,

    ...fonts.regular,
    fontSize: 16,
    color: '#fff',
  },

  item__unread: {
    position: 'absolute',
    top: 28,
    right: 20,

    width: 6,
    height: 6,

    borderRadius: 6,
    backgroundColor: '#fff',
  },

  item__inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  item__left: {
    paddingLeft: 20,
  },

  item__right: {
    paddingRight: 20,
  },
});
