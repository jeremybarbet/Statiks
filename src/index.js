import { Navigation } from 'react-native-navigation';

import { Screens, startApp } from 'screens';
import Store, { StoreProvider } from 'store';

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
