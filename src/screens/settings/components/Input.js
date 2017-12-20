import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TextInput, View, AlertIOS, Platform } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { decorate } from 'react-mixin';
import TimerMixin from 'react-native-timer-mixin';
import { observable } from 'mobx';

import { fonts } from 'styles/variables';
import { colors } from 'utils/colors';
import { icons } from 'Api';

import { Loading, Remove, Success } from './Indicators';

@inject('stats')
@observer
@decorate(TimerMixin)
export default class Input extends Component {

  @observable
  isLoading = false

  @observable
  hasError = false

  @observable
  isSuccess = false

  static propTypes = {
    network: PropTypes.string,
    onPress: PropTypes.func,
    internalRef: PropTypes.func,
  }

  state = {
    value: '',
    showRemoveIcon: false,
  }

  render() {
    const { network, onPress, internalRef, username } = this.props;
    const { value, showRemoveIcon } = this.state;

    const hasText = showRemoveIcon || username;
    const inputValue = value === '' ? username : value;

    const loading = this.isLoading && <Loading loaded={this.isLoading} />;
    const success = this.isSuccess && <Success network={network} />;
    const remove = hasText && <Remove onPress={() => this.removeItem(network)} network={network} />;

    return (
      <View
        style={[s.input, { backgroundColor: colors(network) }]}
        ref={internalRef}
      >
        <View style={s.input__inline}>
          <Image
            style={s.input__icon}
            resizeMode="contain"
            source={this.getIcon(network)}
          />

          {loading}
          {success}

          <TextInput
            ref={(c) => { this.input = c; }}
            style={[s.input__info, { marginRight: hasText ? 46 : 20 }]}
            onFocus={onPress}
            onChangeText={text => this.handleChange(text)}
            onEndEditing={() => this.handleSubmit(inputValue, network)}
            value={inputValue}
            returnKeyType="done"
            enablesReturnKeyAutomatically
            placeholder={network === 'fivehundredpx' ? '500px' : network}
            placeholderTextColor="rgba(255, 255, 255, 0.25)"
            autoCorrect={false}
            autoCapitalize="none"
            selectionColor="rgba(255, 255, 255, 0.8)"
            underlineColorAndroid="transparent"
          />

          {remove}
        </View>
      </View>
    );
  }

  getIcon = name => icons.find(n => n.name === name).icon;

  async removeItem(network) {
    this.props.stats.delete(network);

    this.setState({
      value: '',
      showRemoveIcon: false,
    });
  }

  handleChange = (text) => {
    this.setState({
      value: text,
      showRemoveIcon: text !== '',
    });
  }

  handleSubmit = async (username, network) => {
    const { stats } = this.props;

    if (!username) return;

    this.isLoading = true;

    await stats.fetch(username, network);

    this.isLoading = false;
    this.hasError = stats.status.error;
    this.isSuccess = stats.status.success;

    if (this.hasError) {
      AlertIOS.alert(this.hasError);

      this.setState({
        value: '',
        showRemoveIcon: false,
      });
    }

    this.setTimeout(() => {
      this.isSuccess = false;
    }, 1400);
  }
}

const s = StyleSheet.create({
  input: {
    marginHorizontal: 15,
    marginBottom: 15,
    paddingLeft: 20,
    paddingVertical: Platform.OS === 'ios' ? 20 : 10,

    borderRadius: 4,
  },

  input__inline: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  input__icon: {
    height: 28,
    width: 28,

    tintColor: '#fff',
  },

  input__info: {
    alignSelf: 'flex-end',

    top: Platform.OS === 'ios' ? -2 : 0,

    width: 240,

    ...fonts.regular,
    fontSize: 22,
    color: '#fff',
    textAlign: 'right',

    backgroundColor: 'transparent',
  },
});
