import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import LoginFormComponent from './LoginFormComponent';
import AppLogo from '../../assets/app-logo.png';

const LoginComponent = () => (
  <View style={styles.loginContainer}>
    <View style={styles.test}>
      <Image source={AppLogo} style={styles.image}/>
      <View style={styles.formContainer}>
        <LoginFormComponent />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#f1f1f1',
    height: '100%',
    width: '100%',
  },
  image: {
    marginTop: 70,
  },
  test: {
    flexDirection: 'column',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    width: '100%',
    flexDirection: 'column',
  }
})

export default LoginComponent;