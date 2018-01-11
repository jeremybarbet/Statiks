import { Navigation } from 'react-native-navigation';
import { Sentry, SentryLog } from 'react-native-sentry';
import config from 'react-native-config';

import { Screens, startApp } from 'screens';
import Store, { StoreProvider } from 'store';

if (!__DEV__) {
  Sentry.config(config.SENTRY_DSN, {
    logLevel: SentryLog.Verbose,
  }).install();
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
