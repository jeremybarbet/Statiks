import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, ScrollView, Text, Image, View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import get from 'lodash/get';

import { capitalize, convertToHttps, isIphoneX } from 'utils/utils';
import { colors } from 'utils/colors';
import { navigatorTypes } from 'utils/types';
import { icons } from 'Api';
import { v, fonts } from 'Theme';

import { Stats } from './components/Blocks';

export default class Detail extends Component {

  static propTypes = {
    ...navigatorTypes,
    network: PropTypes.string,
    data: PropTypes.object,
    history: PropTypes.object,
  }

  static navigatorStyle = {
    navBarHidden: true,
  }

  hitIcon = {
    top: 15,
    left: 15,
    bottom: 15,
    right: 15,
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(true, 'fade');
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      StatusBar.setHidden(false, 'fade');
    }
  }

  getIcon = name => icons.find(n => n.name === name).icon;

  hideModal = () => {
    this.props.navigator.dismissModal();
  }

  render() {
    const { network, data, history } = this.props;
    const { user } = data;

    const source = get(data, 'user.avatar')
      ? { uri: convertToHttps(user.avatar) }
      : require('../../assets/images/avatar-placeholder.png');

    return (
      <View style={s.detail}>
        <View style={s.detail__container}>
          <View style={s.detail__header}>
            <TouchableOpacity
              onPress={this.hideModal}
              style={s.detail__arrow}
              hitSlop={this.hitIcon}
              activeOpacity={0.75}
            >
              <Image
                style={s.detail__icon}
                source={require('../../assets/images/arrow-bottom.png')}
              />
            </TouchableOpacity>

            <View style={s.detail__title}>
              <Image
                style={[s.detail__network, { tintColor: colors(network) }]}
                resizeMode="contain"
                source={this.getIcon(network)}
              />

              <Text
                style={[s.detail__name, { color: colors(network) }]}
              >
                {capitalize(network)}
              </Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={s.detail__user}>
              <Image style={s.detail__userAvatar} source={source} />

              {get(data, 'user.name') && <Text style={s.detail__username}>{user.name}</Text>}
              {get(data, 'user.location') && <Text style={s.detail__userText}>{user.location}</Text>}

              <Text style={[s.detail__userText, s.detail__userAbout]}>
                {get(data, 'user.bio') ? user.bio : 'The total view let you see all your stats added up together!'}
              </Text>
            </View>

            <Stats
              network={network}
              data={data.stats}
              history={history}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

function header() {
  if (isIphoneX()) {
    return {
      paddingTop: 25,

      height: 89,
    };
  }

  return {
    marginTop: 0,

    height: 64,
  };
}

function arrow() {
  if (isIphoneX()) {
    return { top: 53 };
  }

  return { top: 28 };
}

const s = StyleSheet.create({
  detail: {
    flex: 1,

    backgroundColor: '#000',
  },

  detail__container: {
    flex: 1,
    overflow: 'hidden',

    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: v.bgBlue,
  },

  detail__header: {
    ...header(),

    shadowColor: 'rgb(23, 24, 26)',
    shadowOffset: { height: 1 },
    shadowRadius: 3,
    shadowOpacity: 0.04,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(225,235,245,0.80)',
    backgroundColor: '#fff',
  },

  detail__arrow: {
    ...arrow(),

    position: 'absolute',
    left: 22,

    backgroundColor: 'transparent',
  },

  detail__icon: {
    tintColor: '#CAD8E6',
  },

  detail__title: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    alignSelf: 'center',

    marginTop: 23,
  },

  detail__network: {
    marginRight: 5,

    width: 20,
    height: 20,
  },

  detail__name: {
    marginLeft: 4,

    ...fonts.bold,
    fontSize: 16,

    backgroundColor: 'transparent',
  },

  detail__user: {
    paddingVertical: 40,
  },

  detail__userAvatar: {
    alignSelf: 'center',

    width: 64,
    height: 64,

    borderRadius: 32,
  },

  detail__username: {
    marginTop: 20,

    ...fonts.bold,
    fontSize: 18,
    color: v.dark,
    textAlign: 'center',

    backgroundColor: 'transparent',
  },

  detail__userText: {
    marginTop: 6,
    paddingHorizontal: 40,

    ...fonts.regular,
    fontSize: 16,
    color: v.lightBlue,
    textAlign: 'center',

    backgroundColor: 'transparent',
  },

  detail__userAbout: {
    marginTop: 20,

    fontSize: 14,
    lineHeight: 22,
  },
});
