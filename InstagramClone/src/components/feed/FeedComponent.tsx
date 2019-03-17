import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class FeedComponent extends React.PureComponent<{},{}> {
  render () {
    return (
      <View style={styles.container}>
        <Text>Feed</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  }
});

export default FeedComponent;