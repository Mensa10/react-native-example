import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginComponent from './src/components/login/LoginComponent';


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});
