/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/redux/configureStore';
import defaultState from './src/redux/defaultState';

const store = configureStore(defaultState);

const renderApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => renderApp);
