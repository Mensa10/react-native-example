import * as React from 'react';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import LoginComponent from './src/components/auth/LoginComponent';
import RegisterComponent from './src/components/auth/RegisterComponent';
import FeedComponent from './src/components/feed/FeedComponent';
import ProfileComponent from './src/components/profile/ProfileComponent';
import UploadComponent from './src/components/upload/UploadComponent';




const bottomNavigator = createBottomTabNavigator({
  Feed: {
    screen: FeedComponent,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }: any) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Feed2: {
    screen: UploadComponent,
    navigationOptions: {
      tabBarLabel: 'Upload',
      tabBarIcon: ({ tintColor }: any) => (
        <Icon name="ios-cloud-upload" color={tintColor} size={24} />
      )
    }
  },
  Feed3: {
    screen: ProfileComponent,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }: any) => (
        <Icon name="ios-person" color={tintColor} size={24} />
      )
    }
  },
}, {
    initialRouteName: 'Feed',
    order: ['Feed2', 'Feed', 'Feed3'],
    tabBarOptions: {
      activeTintColor: '#FE697C',
      inactiveTintColor: '#ccc',
    },
  })


const feedStackNavigator = createStackNavigator({
  Feed: {
    screen: bottomNavigator,
    navigationOptions: {
      title: 'test',
    }
  },
})

const appStackNavigator = createSwitchNavigator({
  Login: LoginComponent,
  Register: RegisterComponent,
  Feed: feedStackNavigator,
})


export default createAppContainer(appStackNavigator);
