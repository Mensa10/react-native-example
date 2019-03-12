import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginComponent from './src/components/login/LoginComponent';

const AppStackNavigator = createStackNavigator({
  Login: LoginComponent,
},
{
  headerMode: 'none',
 })

export default createAppContainer(AppStackNavigator);
