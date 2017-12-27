import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { inject, observer } from 'mobx-react/native';

import Header from 'components/Header';

import { navigatorTypes } from 'utils/types';
import { api } from 'Api';
import { v } from 'Theme';

import Input from './components/Input';

const NETWORKS = Object.keys(api);

@inject('stats')
@observer
export default class Settings extends Component {

  static propTypes = {
    ...navigatorTypes,
  }

  static navigatorStyle = {
    navBarHidden: true,
  }

  render() {
    const { navigator, stats } = this.props;

    return (
      <View style={s.settings}>
        <Header navigator={navigator} title="Options" />

        <KeyboardAvoidingView behavior="padding" style={s.settings}>
          <ScrollView
            style={s.settings__scrollview}
            contentContainerStyle={s.settings__container}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
          >
            {NETWORKS.map(item =>
              <Input
                key={`addView-${item}`}
                username={stats.getUsername(item)}
                network={item}
              />,
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  settings: {
    flex: 1,
  },

  settings__scrollview: {
    paddingTop: 10,

    backgroundColor: v.bgBlue,
  },

  settings__container: {
    paddingBottom: Platform.select({ ios: 10, android: 40 }),
  },
});
