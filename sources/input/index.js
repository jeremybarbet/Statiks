import React, {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS,
  TouchableOpacity,
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import api from '../_utils/api';
import { omit } from '../_utils/object';
import Storage from '../_utils/storage';
import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';


const Icon = createIconSetFromFontello(fontelloConfig);

const LoadingIcon = React.createClass({
  render() {
    return (
      <ActivityIndicatorIOS
        style={ style.itemFeedback }
        animating={ this.props.loaded }
        color={ _variables.white }
        hidesWhenStopped
        size="small"
      />
    );
  }
})

const SuccessIcon = React.createClass({
  render() {
    return (
      <TouchableOpacity
        activeOpacity={ 0.85 }
        style={[ style.itemFeedback, style.itemSuccess ]}
      >
        <Icon
          style={[ style.itemIcon, style.itemSuccessIcon ]}
          name="check"
          color={ colors(this.props.network) }
          size={ 12 }
        />
      </TouchableOpacity>
    );
  }
});

const RemoveIcon = React.createClass({
  render() {
    return (
      <TouchableOpacity
        activeOpacity={ 0.85 }
        style={[ style.itemFeedback, style.itemRemove ]}
        onPress={ this.props.onPress }
      >
        <Icon
          style={[ style.itemIcon, style.itemRemoveIcon ]}
          name="cross"
          color={ colors(this.props.network) }
          size={ 8 }
        />
      </TouchableOpacity>
    );
  }
})

export default React.createClass({
  componentDidMount() {
    this._loadStorage().done();
  },

  async _loadStorage() {
    const { network } = this.props;

    try {
      let storage = await Storage.get('userData');
      let networkData = storage[network];

      if (storage !== null && networkData !== undefined) {
        this.setState({ allData: storage, networkData: networkData, dataLoaded: true });
      }
    } catch (error) {
      console.log('Storage error: ' + error.message);
    }
  },

  getInitialState() {
    return {
      value: '',
      allData: '',
      networkData: '',
      dataLoaded: false,
      isSuccess: false,
      isLoading: false,
    };
  },

  render() {
    const { network } = this.props;
    const { value, networkData, dataLoaded, isSuccess, isLoading } = this.state;

    const loadedWithUsername = (dataLoaded === true && networkData.Username !== '');
    const marginForRemoveIcon = loadedWithUsername ? { marginRight: 46 } : { marginRight: 20 }
    const inputValue = (value === '') ? networkData.Username : value; // If remove all the letters of username input value go to default value coz egal to empty string ''

    const loading = (isLoading === true) ? <LoadingIcon loaded={ isLoading } /> : undefined;
    const success = (isSuccess === true) ? <SuccessIcon network={ network } /> : undefined;
    const remove = loadedWithUsername ? <RemoveIcon onPress={ () => this._removeItem(networkData, network) } network={ network } /> : undefined;

    return (
      <View style={[ style.itemContainer, { backgroundColor: colors(network) } ]}>
        <View>
          <View style={ global.inlineBlock }>
            <View><Icon name={ network } size={ 28 } color={ _variables.white } /></View>

            { loading }
            { success }

            <TextInput
              ref={ network }
              style={[ style.itemInfoMajor, global.alignRight, marginForRemoveIcon ]}
              onFocus={ () => this._handleFocus(networkData) }
              onChangeText={ (text) => this._handleChange(text) }
              onSubmitEditing={ () => this._handleSubmit(value, network) }
              value={ inputValue }
              returnKeyType="done"
              enablesReturnKeyAutomatically={ true }
              placeholder={ network }
              placeholderTextColor="rgba(255, 255, 255, 0.25)"
              autoCorrect={ false }
              autoCapitalize="none"
              selectionColor="rgba(255, 255, 255, 0.8)"
            />

            { remove }
          </View>
        </View>
      </View>
    );
  },

  _removeItem(old, network) {
    this.refs[network].focus();

    const oldNetworks = this.state.allData;
    const newNetworks = omit(oldNetworks, network);

    Storage.save('userData', newNetworks);

    this.setState({
      allData: newNetworks,
      networkData: {},
    });
  },

  async _handleFocus(old) {
    if (old !== '') {
      this.setState({
        value: old.Username
      });
    }
  },

  async _handleChange(text) {
    this.setState({ value: text });
  },

  async _handleSubmit(username, network) {
    api[network](network, username);
  },
});
