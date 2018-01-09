import { Navigation } from 'react-native-navigation';
import { Sentry } from 'react-native-sentry';
import config from 'react-native-config';

import { Screens, startApp } from 'screens';
import Store, { StoreProvider } from 'store';

console.log('-config', config.SENTRY_DSN);

if (!__DEV__) {
  Sentry.config(config.SENTRY_DSN).install();
}

const store = new Store();

Array.from(Screens.entries()).forEach(([screenConst, screenModule]) =>
  Navigation.registerComponent(
    screenConst,
    screenModule,
    store,
    StoreProvider,
  ),
);

store.init().then(startApp);
