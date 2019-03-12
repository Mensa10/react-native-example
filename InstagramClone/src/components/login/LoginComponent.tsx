import * as React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import LoginFormComponent from './LoginFormComponent';
import AppLogo from '../../assets/app-logo.png';

const LoginComponent = (props: any) => {
  const redirectToRegister = () => {
    props.navigation.navigate('Register');
  }
  return (
    <View style={styles.loginContainer}>
      <View style={styles.test}>
        <Image source={AppLogo} style={styles.image} />
        <View style={styles.formContainer}>
          <LoginFormComponent toRegister={redirectToRegister}/>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  image: {
    marginTop: 70,
  },
  test: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flexDirection: 'column',
    width: '100%',
  }
})

export default LoginComponent;