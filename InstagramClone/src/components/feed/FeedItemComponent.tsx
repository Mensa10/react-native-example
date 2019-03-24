import * as React from 'react';
import { View, Text, Image, StyleSheet, ListRenderItemInfo } from 'react-native';
import { FeedContent } from '../../helpers/types';
import AsyncImageLoader from '../global/components/AsyncImageLoader';

const catLoader = require('../../assets/cat1-load.gif');
const profilePlaceholder = require('../../assets/profilePlaceholder.jpg');

interface PropsType {
  feed: ListRenderItemInfo<FeedContent>;
}

const FeedItemComponent = (props: PropsType) => {
  const { feed } = props;
  const { item } = feed;  

  if (!item) return null;

  const uploadedDate = item.createdDate ? new Date(item.createdDate).toLocaleDateString() : new Date().toLocaleDateString();
  const profileImg = item.userProfileImg!.uri ? item.userProfileImg : profilePlaceholder;
  return (
    <View style={styles.container} key={feed.index}>
      <View style={styles.userInfoContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={profileImg} style={styles.userInfoProfileImg} />
          <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{item.displayName}</Text>
        </View>
        <Text style={{ color: '#a0a0a0' }}>{uploadedDate}</Text>
      </View>
      <AsyncImageLoader
        source={item.image}
        style={styles.imageContainer}
        placeholder={catLoader}
      />
      <View style={styles.infoContainer}>
        <Text>{item.title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: 1,
    marginTop: 10,
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
    justifyContent: "space-between",
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