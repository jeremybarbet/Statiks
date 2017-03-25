import React, { Component } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity, StatusBar, NetInfo } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import Storage from '../_utils/storage';
import { capitalize, format, dataIsEmpty } from '../_utils/utils';
import { colors } from '../_utils/networksColors';
import fontelloConfig from '../config.json';
import { SoEmpty } from '../placeholder';
import { NetworkActivity, NetworkGraph, NetworkStats } from '../detailBlock';

const Icon = createIconSetFromFontello(fontelloConfig);

export default class DetailView extends Component {
  state = {
    isConnected: null,
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'fade');

    NetInfo.isConnected.addEventListener('change', this._handleConnectivity);
    this._checkConnectivity();
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, 'fade');
    NetInfo.isConnected.removeEventListener('change', this._handleConnectivity);
  }

  render() {
    const { network, data, sync, history } = this.props;
    const { isConnected } = this.state;
    const networkData = data.user;

    const calendarConfig = {
      sameDay: '[Today], LTS',
      lastDay: '[Yesterday], LTS',
      sameElse: 'dddd, MMMM Do YYYY, h:mm:ss a'
    };

    const username = networkData.Name ? <Text style={ style.userInfoName }>{ networkData.Name }</Text> : undefined;
    const location = networkData.Location ? <Text style={ style.userInfoText }>{ networkData.Location }</Text> : undefined;
    const about = networkData.Bio ? <Text style={[ style.userInfoText, style.userInfoAbout ]}>{ networkData.Bio }</Text> : undefined;
    const avatar = <Image style={ style.userInfoPhoto } source={ (isConnected && networkData.Avatar) ? { uri: networkData.Avatar } : require('./images/avatar-placeholder.png') } />;
    const syncDate = !dataIsEmpty(sync) ? <View><Text style={ style.itemSyncTime }>Last updated: { moment.unix(sync).calendar(null, calendarConfig) }</Text></View> : undefined;

    return (
      <View style={{ backgroundColor: _variables.black, flex: 1 }}>
        <View style={[ global.layout, style.detailGlobal ]}>
          <View style={ style.detailHeader }>
            <TouchableOpacity onPress={ Actions.pop } style={ style.detailHeaderArrow }>
              <Icon name="arrow-bottom" size={ 10 } color="#CAD8E6" style={ style.detailHeaderArrowIcon } />
            </TouchableOpacity>

            <View style={ style.detailHeaderTitle }>
              <Icon name={ network } size={ 20 } color={ colors(network) } />
              <Text style={[ style.detailHeaderTitleName, { color: colors(network) } ]}> { capitalize(network) }</Text>
            </View>

            {/*
            <TouchableOpacity onPress={ () => {} } style={ style.detailHeaderReload }>
              <Icon name="reload" size={ 18 } color="#CAD8E6" style={ style.detailHeaderReloadIcon } />
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

            <NetworkStats
              network={ network }
              data={ data.stats }
              history={ history }
            />

            {/*
            <NetworkGraph network={ network } data={ data.stats } />
            <NetworkActivity network={ network } data={ data.stats } />
            */}

            { syncDate }
          </ScrollView>
        </View>
      </View>
    );
  }

  _checkConnectivity = () => {
    NetInfo.isConnected.fetch().done((isConnected) => this.setState({ isConnected }));
  }

  _handleConnectivity = (isConnected) => {
    if (isConnected === false) {
      this.interval = setInterval(() => this._checkConnectivity(), 3000);
    } else {
      this._checkConnectivity();
      clearInterval(this.interval);
    }
  }
}
