import * as React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';

const img = require('../../assets/bg.jpg');

const FeedItemComponent = () => {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.imageContainer}/>
      <View style={styles.infoContainer}>
        <Text>Image desc</Text>
        <Text>Added 20.03.2019</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    flexDirection: 'column',
    elevation: 1,
    paddingBottom: 10,
    shadowOffset: { width: 0, height: 0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  }
})

export default FeedItemComponent;