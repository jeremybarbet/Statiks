import React, {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import global from '../_styles/global';
import style from './style';

export const LoadingPlaceholder = React.createClass({
  render() {
    return (
      <View style={[ global.layout, style.welcomeContainer ]}>
        <Text style={ style.loading }>Loading...</Text>
      </View>
    );
  }
});

export const EmptyPlaceholder = React.createClass({
  render() {
    return (
      <View style={[ global.layout, style.welcomeContainer ]}>
        <Image style={ style.welcomeIllustration } source={ require('./images/welcome-illu.png') } />

        <View>
          <Text style={ style.welcomeTitle }>{ "Welcome to statiks".toUpperCase() }</Text>
          <Text style={ style.welcomeParagraph }>Hey buddy, you are ready to go ! Let’s add your networks and see the differents stats for each of them.</Text>
        </View>

        <TouchableOpacity activeOpacity={ 0.85 } style={ style.welcomeButton } onPress={ Actions.add }>
          <Text style={ style.welcomeButtonText }>Let’s start</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

export const ErrorPlaceholder = React.createClass({
  render() {
    return (
      <View style={[ global.layout, style.welcomeContainer ]}>
        <Image style={ style.welcomeIllustration } source={ require('./images/error-illu.png') } />

        <View>
          <Text style={ style.welcomeTitle }>{ "There is a problem!".toUpperCase() } </Text>
          <Text style={ style.welcomeParagraph }>I’m so sorry buddy, but something went wrong! Keep calm and reload the app.</Text>
          <Text style={ style.welcomeParagraph }>Hit me up at <Text style={ style.welcomeParagraphLink } onPress={ () => Linking.openURL('https://twitter.com/JeremDsgn') }>@JeremDsgn</Text> if issues remaining.</Text>
        </View>
      </View>
    );
  }
});
