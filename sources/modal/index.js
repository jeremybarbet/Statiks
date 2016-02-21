import React, {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StatusBarIOS,
} from 'react-native';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Actions } from 'react-native-router-flux';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import Storage from '../_utils/storage';
import { capitalize } from '../_utils/utils';
import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';


const Icon = createIconSetFromFontello(fontelloConfig);

const NetworkStats = React.createClass({
  _renderRow(data, item, detail, network, i) {
    return (
      <View key={ i } style={[ style.itemDetailRow ]}>
        <View>
          <Text style={[ style.itemDetailRowText, style.itemDetailNumber ]}>{ detail }</Text>
          <Text style={[ style.itemDetailRowText, style.itemDetailLabel ]}>{ item }</Text>
        </View>

        <View style={[ style.itemDetailGrowth, { backgroundColor: colors(network) } ]}>
          <Text style={ style.itemDetailGrowthNumber }>+4</Text>
        </View>
      </View>
    );
  },

  render() {
    const { data, network } = this.props;

    return (
      <View>
        {
          Object.keys(data).filter(item =>
            item !== 'Username' &&
            item !== 'Followers' &&
            item !== 'Avatar' &&
            item !== 'Bio' &&
            item !== 'Location' &&
            item !== 'Name' &&
            item !== 'City' &&
            item !== 'Country'
          ).map((item, i) => {
            const detail = data[item];
            return this._renderRow(data, item, detail, network, i);
          })
        }
      </View>
    );
  }
});

export default React.createClass({
  componentDidMount() {
    this._loadStorage().done();
    StatusBarIOS.setHidden(true);
  },

  async _loadStorage() {
    const network = this.props.data;

    try {
      let storage = await Storage.get('userData');
      let networkData = storage[network];

      if (storage !== null && networkData !== undefined) {
        this.setState({ [network]: networkData, dataLoaded: true });
      }
    } catch (error) {
      console.log('Storage error: ' + error.message);
    }
  },

  componentWillUnmount() {
    StatusBarIOS.setHidden(false);
  },

  getInitialState() {
    return {
      [this.props.data]: '',
      dataLoaded: false,
    };
  },

  render() {
    const network = this.props.data;
    const networkData = this.state[network];

    const username = (networkData.Name) ? <Text style={ style.userInfoName }>{ networkData.Name }</Text> : undefined;
    const location = (networkData.Location) ? <Text style={ style.userInfoText }>{ networkData.Location }</Text> : undefined;
    const about = (networkData.Bio) ? <Text style={[ style.userInfoText, style.userInfoAbout ]}>{ networkData.Bio }</Text> : undefined;

    return (
      <View style={{ backgroundColor: '#000', flex: 1 }}>
        <View style={[ global.layout, style.modalGlobal ]}>
          <View style={ style.modalHeader }>
            <TouchableOpacity activeOpacity={ 0.85 } onPress={ Actions.pop } style={ style.modalHeaderArrow }>
              <Icon name="arrow-bottom" size={ 10 } style={ style.modalHeaderArrowIcon } />
            </TouchableOpacity>

            <Text style={[ style.modalHeaderTitle, { color: colors(network) } ]}>{ capitalize(network) }</Text>
          </View>

          <ScrollView>
            <View style={ style.userInfo }>
              <Image style={ style.userInfoPhoto } source={{ uri: networkData.Avatar }} />
              { username }
              { location }
              { about }
            </View>

            <View style={ style.itemDetail }>
              <Text style={ style.itemTitle }>{ "User statistics".toUpperCase() }</Text>
              <NetworkStats network={ network } data={ networkData } />
            </View>

            <View style={ style.itemDetail }>
              <Text style={ style.itemTitle }>{ "Graphics".toUpperCase() }</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  },
});
