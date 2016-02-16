import React, {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS,
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import api from '../_utils/api';
import Storage from '../_utils/storage';
import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';


const Icon = createIconSetFromFontello(fontelloConfig);

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
        this.setState({ data: networkData, dataLoaded: true });
      }
    } catch (error) {
      console.log('Storage error: ' + error.message);
    }
  },

  getInitialState() {
    return {
      value: '',
      data: '',
      oldValue: '',
      dataLoaded: false,
      isSuccess: false,
      isLoading: false,
    };
  },

  render() {
    const { network } = this.props;
    const { value, data, oldValue, dataLoaded, isSuccess, isLoading } = this.state;

    const loading = (isLoading == true) ? <ActivityIndicatorIOS style={ style.itemFeedback } animating={ isLoading } color={ _variables.white } hidesWhenStopped size="small" /> : undefined;
    const success = (isSuccess === true) ? <View style={[ style.itemFeedback, style.itemSuccess ]}><Icon style={ style.itemSuccessIcon } name="check" color={ colors(network) } size={ 12 }></Icon></View> : undefined;

    return (
      <View style={[ style.itemContainer, { backgroundColor: colors(network) } ]}>
        <View>
          <View style={ global.inlineBlock }>
            <View><Icon name={ network } size={ 28 } color={ _variables.white } /></View>

            { loading }
            { success }

            <View>
              <TextInput
                style={[ style.itemInfoMajor, global.alignRight ]}
                onFocus={ () => this._handleFocus(data) }
                onChangeText={ (text) => this._handleChange(text) }
                onSubmitEditing={ () => this._handleSubmit(value, network) }
                onBlur={ () => this._handleBlur() }
                value={ data.username }
                returnKeyType="done"
                enablesReturnKeyAutomatically={ true }
                placeholder={ network }
                placeholderTextColor="rgba(255, 255, 255, 0.25)"
                autoCorrect={ false }
                autoCapitalize="none"
                selectionColor="rgba(255, 255, 255, 0.8)"
              />
            </View>
          </View>
        </View>
      </View>
    );
  },

  _handleFocus(old) {
    this.setState({
      data: {},
      oldValue: old
    });
  },

  async _handleChange(text) {
    this.setState({ value: text });
  },

  async _handleSubmit(username, network) {
    api[network](network, username);
  },

  _handleBlur() {
    const { value, oldValue } = this.state;
    if (value === '') this.setState({ data: oldValue })
  },
});
