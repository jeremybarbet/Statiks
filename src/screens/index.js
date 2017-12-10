import { Navigation } from 'react-native-navigation';

import List from './list';
import Detail from './detail';
import Settings from './settings';

// Contains screen modules
export const Screens = new Map();

// Create unique const screen keys
export const LIST = 'statiks.List';
export const DETAIL = 'statiks.Detail';
export const SETTINGS = 'statiks.Settings';

// Map screen consts to their representive module
Screens.set(LIST, () => List);
Screens.set(DETAIL, () => Detail);
Screens.set(SETTINGS, () => Settings);

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: LIST,
      navigatorStyle: { navBarHidden: true },
    },
  });
};
