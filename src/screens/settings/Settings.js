import React, { Component } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView, FlatList } from 'react-native';
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

  handlePrev = () => {
    this.props.navigator.pop();
  }

  get networks() {
    return NETWORKS.map(key => ({ key }));
  }

  renderItem = ({ item: { key } }) => <Input network={key} />

  render() {
    const behavior = Platform.OS === 'ios' ? 'padding' : null;

    return (
      <View style={s.settings}>
        <Header onPrev={this.handlePrev} title="Options" />

        <KeyboardAvoidingView behavior={behavior} style={s.settings}>
          <FlatList
            style={s.settings__flatlist}
            contentContainerStyle={s.settings__container}
            data={this.networks}
            renderItem={this.renderItem}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const s = StyleSheet.create({
  settings: {
    flex: 1,
  },

  settings__flatlist: {
    paddingTop: 10,

    backgroundColor: v.bgBlue,
  },

  settings__container: {
    paddingBottom: Platform.select({ ios: 10, android: 40 }),
  },
});
