import { isDevelopment } from '@consts';
import { registerRootComponent } from 'expo';

import App from './app/App';

if (isDevelopment) {
  require('react-native-url-polyfill/auto')
  const { mockServer } = require('./shared/mocks')
  mockServer.listen()
}

registerRootComponent(App);

