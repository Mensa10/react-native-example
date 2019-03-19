import * as React from 'react';
import { View, Text, Image, StyleSheet, ListRenderItemInfo} from 'react-native';
import { FeedContent } from '../../helpers/types';

const img = require('../../assets/bg.jpg');

interface PropsType {
  feed: ListRenderItemInfo<FeedContent>;
}

const FeedItemComponent = (props: PropsType) => {
  const { feed } = props;
  const { item } = feed;

  if (!item) return null;
  
  const uploadedDate = item.createdDate ? new Date(item.createdDate).toLocaleDateString() : new Date().toLocaleDateString();
  
  return (
    <View style={styles.container} key={feed.index}>
      <View style={styles.userInfoContainer}>
        <Image source={item.userProfileImg!} style={styles.userInfoProfileImg}/>
        <Text>Added - {uploadedDate}</Text>
      </View>
      <Image source={item.image} style={styles.imageContainer}/>
      <View style={styles.infoContainer}>
        <Text>{item.title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 20,
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 2,
  },
  imageContainer: {
    width: '100%',
    height: 300,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  userInfoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 10,
    justifyContent:"space-between",
    alignItems: 'center',
    paddingRight: 10,
  },
  userInfoProfileImg: {
    borderRadius: 20,
    height: 35,
    width: 35,
  }
})

export default FeedItemComponent;