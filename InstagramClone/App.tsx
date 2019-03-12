import { createStackNavigator, createAppContainer } from 'react-navigation';

import LoginComponent from './src/components/login/LoginComponent';
import RegisterComponent from './src/components/register/RegisterComponent';

const AppStackNavigator = createStackNavigator({
  Login: LoginComponent,
  Register: RegisterComponent,
},
{
  headerMode: 'none',
 })

export default createAppContainer(AppStackNavigator);
