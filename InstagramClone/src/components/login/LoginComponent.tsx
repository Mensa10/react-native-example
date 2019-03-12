import * as React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';

import LoginFormComponent from './LoginFormComponent';
const AppLogo = require( '../../assets/app-logo.png');

const LoginComponent = (props: any) => {
  const navigate = (route: string) => {
    props.navigation.navigate(route);
  }
  return (
    <SafeAreaView style={styles.loginContainer}>
      <View style={styles.test}>
        <Image source={AppLogo} style={styles.image} />
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding" enabled>
          <LoginFormComponent navigate={navigate}/>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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