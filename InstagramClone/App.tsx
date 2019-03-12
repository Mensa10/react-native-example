import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import LoginComponent from './src/components/login/LoginComponent';
import RegisterComponent from './src/components/register/RegisterComponent';
import FeedComponent from './src/components/feed/FeedComponent';

const bottomNavigator = createBottomTabNavigator({
  Feed: FeedComponent,
  Feed2: FeedComponent,
  Feed3: FeedComponent,
})

const appStackNavigator = createStackNavigator({
  Login: LoginComponent,
  Register: RegisterComponent,
  Feed: bottomNavigator,
}, {
  headerMode: 'none',
})

export default createAppContainer(appStackNavigator);
