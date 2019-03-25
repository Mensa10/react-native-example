import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text } from 'react-native';
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

class UploadComponent extends React.PureComponent<PropsType, {}> {
  uploadAction = (values: any) => {
    this.props.upload(values, this.props.navigation);
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.textStyle}>Upload your content</Text>
        <UploadFormComponent
          upload={this.uploadAction}
          isFetching={this.props.isFetching}
          navigation={this.props.navigation}
        />
      </KeyboardAvoidingView>
    )
  }
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
    marginTop: 40,
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
