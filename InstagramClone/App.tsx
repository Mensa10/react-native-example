import * as React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginComponent from './src/components/login/LoginComponent';
import RegisterComponent from './src/components/register/RegisterComponent';
import FeedComponent from './src/components/feed/FeedComponent';

const bottomNavigator = createBottomTabNavigator({
  Feed: {
    screen: FeedComponent,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({tintColor} : any) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Feed2: {
    screen: FeedComponent,
    navigationOptions: {
      tabBarLabel: 'Upload',
      tabBarIcon: ({tintColor} : any) => (
        <Icon name="ios-cloud-upload" color={tintColor} size={24} />
      )
    }
  },
  Feed3: {
    screen: FeedComponent,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor} : any) => (
        <Icon name="ios-settings" color={tintColor} size={24} />
      )
    }
  },
}, {
  initialRouteName: 'Feed',
  order: ['Feed2', 'Feed', 'Feed3'],
  tabBarOptions: {
    activeTintColor: '#FE697C',
    inactiveTintColor: '#ccc',
  }
})

const appStackNavigator = createStackNavigator({
  Login: LoginComponent,
  Register: RegisterComponent,
  Feed: bottomNavigator,
}, {
  headerMode: 'none',
})

export default createAppContainer(appStackNavigator);
