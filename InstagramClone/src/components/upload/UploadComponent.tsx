import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';

import UploadFormComponent from './UploadFormComponent';
import { FeedContent } from '../../helpers/types';
import { uploadFeed } from '../feed/actions/feedActions';

interface PropsType {
  upload: (feed: FeedContent) => void;
}

const UploadComponent = (props: PropsType) => (
  <View style={styles.container}>
    <Text style={styles.textStyle}>Upload your content</Text>
    <UploadFormComponent upload={props.upload} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
},
  textStyle: {
    fontSize: 32,
    marginBottom: 20,
  }
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  upload: (feed: FeedContent) => {
    dispatch(uploadFeed(feed));
  }
})

export default connect(null, mapDispatchToProps)(UploadComponent);
