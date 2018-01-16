import { Navigation } from 'react-native-navigation';

import List from './list';
import Detail from './detail';
import Settings from './settings';
import Permission from './permission';

// Contains screen modules
export const Screens = new Map();

// Create unique const screen keys
export const LIST = 'statiks.List';
export const DETAIL = 'statiks.Detail';
export const SETTINGS = 'statiks.Settings';
export const PERMISSION = 'statiks.Permission';

// Map screen consts to their representive module
Screens.set(LIST, () => List);
Screens.set(DETAIL, () => Detail);
Screens.set(SETTINGS, () => Settings);
Screens.set(PERMISSION, () => Permission);

export const startApp = (data) => {
  if (data.permission === 'waiting') {
    startPermission();
  } else {
    startList();
  }
};

export const startPermission = () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: PERMISSION,
      navigatorStyle: { navBarHidden: true },
    },
  });

export const startList = () =>
  Navigation.startSingleScreenApp({
    screen: {
      screen: LIST,
      navigatorStyle: { navBarHidden: true },
    },
  });
