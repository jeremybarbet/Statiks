import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

import { format, getRatio, capitalize } from 'utils/utils';
import { colors } from 'utils/colors';
import { v, fonts } from 'Theme';

const isValidRatio = (frs, fng) => (frs && frs.count > 0) && (fng && fng.count > 0);

class Stats extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    network: PropTypes.string,
  }

  renderRow = (value, stat, network) => (
    <View key={`detail-row-${value}`} style={s.item__row}>
      <View>
        <Text style={[s.item__text, s.item__number]}>{format(stat.count)}</Text>
        <Text style={[s.item__text, s.item__label]}>{capitalize(value)}</Text>
      </View>

      {stat.diff !== 0 && <Diff network={network} diff={stat.diff} />}
    </View>
  )

  render() {
    const { data, network } = this.props;
    const { followers, following } = data;

    return (
      <View style={s.item}>
        <Text style={s.item__title}>{'User statistics'.toUpperCase()}</Text>
        {Object.keys(data).map(item => this.renderRow(item, data[item], network))}

        {isValidRatio(followers, following) && (
          <Ratio ratio={getRatio(followers.count, following.count)} />
        )}
      </View>
    );
  }
}

class Ratio extends PureComponent {

  static propTypes = {
    ratio: PropTypes.string,
  }

  render() {
    const { ratio } = this.props;

    return (
      <View style={s.item__ratio}>
        <View style={s.item__row}>
          <Text style={[s.item__text, s.item__number]}>
            {ratio}
          </Text>

          <Text style={[s.item__text, s.item__label]}>
            Ratio followers/following
          </Text>
        </View>
      </View>
    );
  }
}

class Diff extends PureComponent {

  static propTypes = {
    diff: PropTypes.number,
    network: PropTypes.string,
  }

  render() {
    const { diff, network } = this.props;

    return (
      <View style={[s.item__growth, { backgroundColor: colors(network) }]}>
        <Text style={s.item__growthNumber}>
          {diff > 0 ? `+${diff}` : diff}
        </Text>
      </View>
    );
  }
}

const s = StyleSheet.create({
  item: {
    flex: 1,

    marginHorizontal: 15,
    marginBottom: 15,

    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e1ebf5',
    borderRadius: 4,
  },

  item__title: {
    marginLeft: 25,
    marginTop: 30,
    marginBottom: 20,

    ...fonts.medium,
    fontSize: 14,
    color: v.lightBlue,
    letterSpacing: 0.75,
  },

  item__ratio: {
    marginTop: 8,
    paddingVertical: 8,

    borderTopWidth: 1,
    borderColor: '#e1ebf5',
  },

  item__row: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },

  item__text: {
    paddingBottom: 0,

    color: v.graySaturate,
  },

  item__label: {
    marginTop: 4,

    ...fonts.regular,
    fontSize: 14,
    color: v.lightBlue,
  },

  item__number: {
    ...fonts.regular,
    fontSize: 24,
    color: v.dark,
  },

  item__growth: {
    position: 'absolute',
    top: 30,
    right: 25,

    paddingHorizontal: 10,
    paddingVertical: 6,

    borderRadius: 4,
  },

  item__growthNumber: {
    ...fonts.medium,
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',

    backgroundColor: 'transparent',
  },
});

export {
  Stats,
  Ratio,
  Diff,
};
