import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import UploadFormComponent from './UploadFormComponent';
import { FeedContent } from '../../helpers/types';
import { uploadFeed } from '../feed/actions/feedActions';
import { GlobalAppStateType } from '../../redux/defaultState';

interface PropsType extends NavigationInjectedProps {
  upload: (feed: FeedContent, nav: any) => void;

  isFetching: boolean;
}

const UploadComponent = (props: PropsType) => {
  const uploadAction = (values: any) => {
    props.upload(values, props.navigation);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Upload your content</Text>
      <UploadFormComponent upload={uploadAction} isFetching={props.isFetching} />
    </View>
  )
};

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
  upload: (feed: FeedContent, nav: any) => {
    dispatch(uploadFeed(feed, nav));
  }
});

const mapStateToProps = (state: GlobalAppStateType) => ({
  isFetching: state.global.fetching,
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadComponent);
