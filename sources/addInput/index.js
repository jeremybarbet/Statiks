import React, { Component, PropTypes } from 'react';
import { TextInput, View } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { omit, get } from 'lodash';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import api from '../api';
import * as utils from '../_utils/utils';
import objTotal from '../_utils/total';
import Storage from '../_utils/storage';
import { colors } from '../_utils/networksColors';
import Loading from '../addIndicators/Loading';
import Success from '../addIndicators/Success';
import Remove from '../addIndicators/Remove';
import fontelloConfig from '../config.json';

const Icon = createIconSetFromFontello(fontelloConfig);

export default class AddInput extends Component {

  static propTypes = {
    network: PropTypes.string,
  };

  state = {
    value: '',
    data: '',
    isSuccess: false,
    isLoading: false,
    showRemoveIcon: false,
  };

  componentDidMount() {
    this._loadStorage().done();
  }

  componentWillUnmount() {
    clearTimeout(this.successTimeout);
  }

  async _loadStorage() {
    try {
      const storage = await Storage.get('userData');

      if (storage !== null && Object.keys(storage).length > 0) {
        this.setState({ data: storage });
      }
    } catch (error) {
      console.log(`Storage error: ${error.message}`); // eslint-disable-line
    }
  }

  render() {
    const { network } = this.props;
    const { value, data, isSuccess, isLoading, showRemoveIcon } = this.state;

    const condition = showRemoveIcon || get(data[network], 'data.user.Username');
    const marginForRemoveIcon = condition ? { marginRight: 46 } : { marginRight: 20 };
    const inputValue = (value === '') ? get(data[network], 'data.user.Username') : value;

    const loading = (isLoading === true) ? <Loading loaded={isLoading} /> : undefined;
    const success = (isSuccess === true) ? <Success network={network} /> : undefined;

    const remove = condition
      ? <Remove onPress={() => this._removeItem(network)} network={network} />
      : undefined;

    return (
      <View style={[style.itemContainer, { backgroundColor: colors(network) }]}>
        <View>
          <View style={global.inlineBlock}>
            <View>
              <Icon
                name={network}
                size={28}
                color={_variables.white}
              />
            </View>

            {loading}
            {success}

            <TextInput
              ref={(c) => { this.input = c; }}
              style={[style.itemInfoMajor, global.alignRight, marginForRemoveIcon]}
              onChangeText={text => this._handleChange(text)}
              onEndEditing={() => this._handleSubmit(inputValue, network)}
              value={inputValue}
              returnKeyType="done"
              enablesReturnKeyAutomatically
              placeholder={network === 'fivehundredpx' ? '500px' : network}
              placeholderTextColor="rgba(255, 255, 255, 0.25)"
              autoCorrect={false}
              autoCapitalize="none"
              selectionColor="rgba(255, 255, 255, 0.8)"
            />

            {remove}
          </View>
        </View>
      </View>
    );
  }

  async _removeItem(network) {
    this.input.focus();

    const storage = await Storage.get('userData');
    const newArr = utils.findAndRemove(storage.total.networks, network); // eslint-disable-line
    const newNetworks = omit(storage, network);

    objTotal.subtract(storage.total.stats, storage[network].data.stats);
    Storage.save('userData', newNetworks);

    this.setState({
      data: newNetworks,
      value: '',
      showRemoveIcon: false,
      isLoading: false,
    });
  }

  _handleChange = (text) => {
    if (text === '') {
      this.setState({
        value: '',
        showRemoveIcon: false,
      });
    } else {
      this.setState({ showRemoveIcon: true });
    }

    this.setState({ value: text });
  }

  _handleSubmit = (username, network) => {
    const { data } = this.state;
    const storedUsername = get(data[network], 'data.user.Username');

    if (username !== storedUsername) {
      this.setState({ isLoading: true });

      api[network](
        network,
        username,
        null,
        null,
        data.total,
      ).then((value) => {
        if (!get(value, 'state')) {
          return this.setState({
            isLoading: false,
            isSuccess: false,
            value: '',
            showRemoveIcon: false,
          });
        }

        if (value.state === 'success') {
          this.setState({
            isLoading: false,
            isSuccess: true,
          });

          this.successTimeout = setTimeout(() => {
            this._loadStorage().done();

            this.setState({
              isLoading: false,
              isSuccess: false,
            });
          }, 1500);
        }
      });
    }
  }
}
