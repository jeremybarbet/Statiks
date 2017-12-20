import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
// import isNil from 'lodash/isNil';

import v from 'styles/variables';
import { format, getRatio, capitalize } from 'utils/utils';
import { colors } from 'utils/colors';

class Stats extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    network: PropTypes.string,
  }

  render() {
    const { data, network } = this.props;
    const { followers, following } = data;

    return (
      <View style={s.item}>
        <Text style={s.item__title}>{'User statistics'.toUpperCase()}</Text>
        {Object.keys(data).map(item => this.renderRow(item, data[item], network))}
        <Ratio ratio={getRatio(followers, following)} />
      </View>
    );
  }

  renderRow = (item, detail/* , network */) => (
    <View key={`detail-row-${item}`} style={s.item__row}>
      <View>
        <Text style={[s.item__text, s.item__number]}>{format(detail)}</Text>
        <Text style={[s.item__text, s.item__label]}>{capitalize(item)}</Text>
      </View>

      {/* !isNil(diff) && <Diff network={network} diff={diff} /> */}
    </View>
  )
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
        <Text style={s.item__growthNumber}>{(diff > 0) ? `+${diff}` : diff}</Text>
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

    fontFamily: v.dinMedium,
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

    fontFamily: v.din,
    fontSize: 14,
    color: v.lightBlue,
  },

  item__number: {
    fontFamily: v.din,
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
    fontFamily: v.dinMedium,
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
