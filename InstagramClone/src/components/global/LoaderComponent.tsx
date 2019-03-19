import * as React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoaderComponent = () => (
  <View style={styles.activityContainer}>
    <ActivityIndicator size="large" color="red" />
  </View>
);

const styles = StyleSheet.create({
  activityContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  }
})

export default LoaderComponent;
