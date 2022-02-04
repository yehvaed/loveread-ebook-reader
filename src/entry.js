import { registerRootComponent } from 'expo';

import App from './app/App';

if (process.env.NODE_ENV === 'development') {
  require('react-native-url-polyfill/auto')
  const { native } = require('./mocks/native')
  native.listen()
}

registerRootComponent(App);

