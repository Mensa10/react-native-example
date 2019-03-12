import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import RegisterFormComponent from './RegisterFormComponent';
const appLogo = require('../../assets/app-logo.png');

const RegisterComponent = () => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Register with us</Text>
      <Image source={appLogo} style={styles.headerLogo}/>
    </View>
    <RegisterFormComponent />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 32,
  },
  headerLogo: {
    height: 40,
    width: 40,
  }
});

export default RegisterComponent;