/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { firebase } from '@firebase/app'

import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/redux/configureStore';
import defaultState from './src/redux/defaultState';


const config = {
  apiKey: "AIzaSyCU1S31Yfw9qSmxVdNThme3Q_B6uUQfdOg",
  authDomain: "instagram-clone-85e2c.firebaseapp.com",
  databaseURL: "https://instagram-clone-85e2c.firebaseio.com",
  projectId: "instagram-clone-85e2c",
  storageBucket: "instagram-clone-85e2c.appspot.com",
  messagingSenderId: "558126075324",
}

const store = configureStore(defaultState);
firebase.initializeApp(config);

const renderApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => renderApp);
