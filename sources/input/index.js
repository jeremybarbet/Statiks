import React from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import api from '../_utils/api';
import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';


const {
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicatorIOS
} = React;

const Icon = createIconSetFromFontello(fontelloConfig);

export default React.createClass({
  getInitialState() {
    return {
      username: undefined,
      isLoading: false,
      isSuccess: false
    };
  },

  render() {
    const { network, focus, value, onFocus } = this.props;
    const { username, isLoading, isSuccess } = this.state;

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
                onFocus={ onFocus }
                onChangeText={ this._onChange }
                onSubmitEditing={ () => this._onSubmit(network) }
                value={ value }
                returnKeyType="done"
                enablesReturnKeyAutomatically={ true }
                clearButtonMode="always"
                placeholder={ network }
                placeholderTextColor="rgba(255, 255, 255, 0.25)"
                autoCorrect={ false }
                autoCapitalize="none"
                clearTextOnFocus={ true }
              />
            </View>
          </View>
        </View>
      </View>
    );
  },

  _onSubmit(network) {
    const { username } = this.state;
    // this.setState({ isLoading: true });
    api[network](network, username);
  },

  _onChange(username) {
    this.setState({ username });
  },
});
