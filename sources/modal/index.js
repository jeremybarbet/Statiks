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
import moment from 'moment';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import Storage from '../_utils/storage';
import { capitalize, format, dataIsEmpty, sum } from '../_utils/utils';
import { luminosity, colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';
import { SoEmpty } from '../placeholder';


const Icon = createIconSetFromFontello(fontelloConfig);

const NetworkGraph = React.createClass({
  render() {
    const { data } = this.props;

    return (
      <View style={ style.itemDetail }>
        <Text style={ style.itemTitle }>{ "Graphics".toUpperCase() }</Text>

        <View>

        </View>
      </View>
    );
  }
})

const NetworkStats = React.createClass({
  _renderRow(data, item, detail, network, i) {
    return (
      <View key={ i } style={ style.itemDetailRow }>
        <View>
          <Text style={[ style.itemDetailRowText, style.itemDetailNumber ]}>{ format(detail) }</Text>
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

    const filterArr = [];
    Object.keys(data).filter(item => filterArr.push(data[item]));

    const content = Object.keys(data).filter(item => data[item] !== 0).map((item, i) => {
      return this._renderRow(data, item, data[item], network, i)
    });

    if (sum(filterArr) === 0) {
      return (
        <View style={ style.itemDetail }>
          <SoEmpty network={ network } />
        </View>
      )
    }

    return (
      <View style={ style.itemDetail }>
        <Text style={ style.itemTitle }>{ "User statistics".toUpperCase() }</Text>

        { content }

        <View style={[ style.itemDetailRow ]}>
          <View>
            <Text style={[ style.itemDetailRowText, style.itemDetailNumber ]}>{ `${ Math.ceil(data.Followers / data.Following) }:1` }</Text>
            <Text style={[ style.itemDetailRowText, style.itemDetailLabel ]}>Ratio followers/following</Text>
          </View>

          {/*
          <View style={[ style.itemDetailGrowth, { backgroundColor: colors(network) } ]}>
            <Text style={ style.itemDetailGrowthNumber }>+4</Text>
          </View>
          */}
        </View>
      </View>
    );
  }
});

export default React.createClass({
  componentDidMount() {
    StatusBarIOS.setHidden(true);
  },

  componentWillUnmount() {
    StatusBarIOS.setHidden(false);
  },

  render() {
    const { network, data, sync } = this.props;
    const networkData = data.user;

    const calendarConfig = {
      sameDay: '[Today], LTS',
      lastDay: '[Yesterday], LTS',
      sameElse: 'dddd, MMMM Do YYYY, h:mm:ss a'
    };

    const username = networkData.Name ? <Text style={ style.userInfoName }>{ networkData.Name }</Text> : undefined;
    const location = networkData.Location ? <Text style={ style.userInfoText }>{ networkData.Location }</Text> : undefined;
    const about = networkData.Bio ? <Text style={[ style.userInfoText, style.userInfoAbout ]}>{ networkData.Bio }</Text> : undefined;
    const avatar = <Image style={ style.userInfoPhoto } source={ networkData.Avatar ? { uri: networkData.Avatar } : require('./images/avatar-placeholder.png') } />;
    const syncDate = !dataIsEmpty(sync) ? <View><Text style={ style.itemSyncTime }>Last updated: { moment.unix(sync).calendar(null, calendarConfig) }</Text></View> : undefined;

    return (
      <View style={{ backgroundColor: _variables.black, flex: 1 }}>
        <View style={[ global.layout, style.modalGlobal ]}>
          <View style={ style.modalHeader }>
            <TouchableOpacity onPress={ Actions.pop } style={ style.modalHeaderArrow }>
              <Icon name="arrow-bottom" size={ 10 } color="#CAD8E6" style={ style.modalHeaderArrowIcon } />
            </TouchableOpacity>

            <View style={ style.modalHeaderTitle }>
              <Icon name={ network } size={ 20 } color={ colors(network) } />
              <Text style={[ style.modalHeaderTitleName, { color: colors(network) } ]}> { capitalize(network) }</Text>
            </View>

            {/*
            <TouchableOpacity onPress={ () => {} } style={ style.modalHeaderReload }>
              <Icon name="reload" size={ 18 } color="#CAD8E6" style={ style.modalHeaderReloadIcon } />
            </TouchableOpacity>
            */}
          </View>

          <ScrollView>
            <View style={ style.userInfo }>
              { avatar }
              { username }
              { location }
              { about }
            </View>

            <NetworkStats network={ network } data={ data.stats } />
            <NetworkGraph network={ network } data={ data.stats } />

            { syncDate }
          </ScrollView>
        </View>
      </View>
    );
  },
});
