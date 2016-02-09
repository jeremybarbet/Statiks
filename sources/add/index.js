import React from 'react-native';

import _variables from '../_styles/variables';
import global from '../_styles/global';
import style from './style';

import Storage from '../_utils/storage';
import Input from '../input'


const {
  Text,
  View,
  ScrollView,
} = React;

export default React.createClass({
  getInitialState() {
    return {
      data: '',
      isLoading: true
    };
  },

  componentWillMount() {
    this._loadInitialState().done();
  },

  componentDidUpdate() {
    // this._loadInitialState().done();
  },

  async _loadInitialState() {
    try {
      const value = await Storage.get('userData');

      if (value !== null) {
        // console.log('Recovered selection from disk');

        this.setState({
          data: value,
          isLoading: false
        });
      } else {
        // console.log('Initialized with no selection on disk.');
      }
    } catch (err) {
      // console.log('AsyncStorage error :(');
      // console.log(err);
    }
  },

  _renderRow(item, username, i) {
    const value = (username !== undefined) ? username : undefined;

    /*
    * TODO
    * - Change text props
    */
    return (
      <Input
        value={ value }
        key={ i }
        network={ item }
      />  
    );
  },

  render() {
    const { data, isLoading } = this.state;
    const networks = ['dribbble', 'twitter', 'behance', 'cinqcentpx', 'github', 'vimeo', 'instagram', 'pinterest', 'soundcloud', 'producthunt'];

    return (
      <ScrollView style={[ global.layout, style.addContainer ]} keyboardShouldPersistTaps={ true }>
        {
          networks.map((item, i) => {
            let username;
            if (!isLoading) username = (data.hasOwnProperty(item)) ? data[item].username : undefined;

            return this._renderRow(item, username, i);
          })
        }
      </ScrollView>
    );
  }
});
