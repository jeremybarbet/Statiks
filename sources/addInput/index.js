import React, {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS,
  TouchableOpacity,
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import TimerMixin from 'react-timer-mixin';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import api from '../api';
import { dataIsEmpty } from '../_utils/utils';
import { omit } from '../_utils/object';
import Storage from '../_utils/storage';
import { colors } from '../_utils/networksColors';
import { Loading, Success, Remove } from '../addIndicators';
import fontelloConfig from '../config.json';


const Icon = createIconSetFromFontello(fontelloConfig);

export default React.createClass({
  mixins: [TimerMixin],

  componentDidMount() {
    this._loadStorage().done();
  },

  async _loadStorage() {
    const { network } = this.props;

    try {
      let storage = await Storage.get('userData');
      let networkData = storage[network];

      if (storage !== null && networkData !== undefined) {
        this.setState({ allData: storage, networkData: networkData.data.user, dataLoaded: true });
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
      showRemoveIcon: false
    };
  },

  render() {
    const { network } = this.props;
    const { value, networkData, dataLoaded, isSuccess, isLoading, showRemoveIcon } = this.state;

    const condition = showRemoveIcon || !dataIsEmpty(networkData.Username);
    const marginForRemoveIcon = condition ? { marginRight: 46 } : { marginRight: 20 }
    const inputValue = (value === '') ? networkData.Username : value;

    const loading = (isLoading === true) ? <Loading loaded={ isLoading } /> : undefined;
    const success = (isSuccess === true) ? <Success network={ network } /> : undefined;
    const remove = condition ? <Remove onPress={ () => this._removeItem(network) } network={ network } /> : undefined;

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
              onChangeText={ (text) => this._handleChange(text) }
              onSubmitEditing={ () => this._handleSubmit(inputValue, network) }
              value={ inputValue }
              returnKeyType="done"
              enablesReturnKeyAutomatically={ true }
              placeholder={ (network === 'fivehundredpx') ? '500px' : network }
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

  _removeItem(network) {
    this.refs[network].focus();

    const oldNetworks = this.state.allData;
    const newNetworks = omit(oldNetworks, network);

    Storage.save('userData', newNetworks);

    this.setState({
      allData: newNetworks,
      networkData: {},
      value: '',
      showRemoveIcon: false,
      isLoading: false
    });
  },

  async _handleChange(text) {
    if (text === '') this.setState({ value: '', networkData: {}, showRemoveIcon: false });
    else this.setState({ showRemoveIcon: true });
    this.setState({ value: text });
  },

  async _handleSubmit(username, network) {
    const that = this;
    this.setState({ isLoading: true });

    Promise.resolve(api[network](network, username)).then((value) => {
      if (value === 'success') {
        that.setState({ isLoading: false, isSuccess: true });

        that.setTimeout(() => {
          that.setState({ isLoading: false, isSuccess: false });
        }, 1500);
      } else {
        that.setState({ isLoading: false, isSuccess: false, value: '', showRemoveIcon: false });
      }
    });
  },
});