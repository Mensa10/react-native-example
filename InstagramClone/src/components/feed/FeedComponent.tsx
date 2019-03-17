import * as React from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';

import FeedItemComponent from './FeedItemComponent';

class FeedComponent extends React.PureComponent<{}, {}> {
  render() {
    const niz = [{1:1}, {2:2}, {3:3} ,{4:4}, {1:1}, {2:2}, {3:3} ,{4:4}]
    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={niz}
          renderItem={(item) => <FeedItemComponent />}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  }
});

export default FeedComponent;