import * as React from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import FeedItemComponent from './FeedItemComponent';
import LoaderComponent from '../global/LoaderComponent';
import CustomModal from '../global/components/Modal';
import { getAllFeed } from './actions/feedActions';
import { toggleRegisterModal } from '../auth/actions/authActions';
import { GlobalAppStateType } from '../../redux/defaultState';
import { FeedContent } from '../../helpers/types';

interface PropsType extends NavigationInjectedProps {
  getAll: () => void;

  toggleModal: () => void;

  allFeed: FeedContent[] | null;

  isFetching: boolean;

  firstLogin: boolean;
}

class FeedComponent extends React.PureComponent<PropsType, {}> {
  componentWillMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.props.getAll();
    })
  }
  render() {
    const { allFeed, isFetching, firstLogin, toggleModal } = this.props;

    if (!allFeed) {
      return <LoaderComponent />;
    }
    allFeed.sort((a, b) => {
      return new Date(b.createdDate) as any - (new Date(a.createdDate) as any);
    })

    return (
      <SafeAreaView style={styles.container}>
        <CustomModal
          visible={firstLogin}
          modalText='Welcome to this example app which will show the power of React Native'
          onClose={toggleModal}
        />
        <FlatList
          data={allFeed}
          renderItem={(feed) => <FeedItemComponent feed={feed} />}
          keyExtractor={(feed) => feed.title}
          refreshing={isFetching}
          onRefresh={this.props.getAll}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  }
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  getAll: () => {
    dispatch(getAllFeed())
  },
  toggleModal: () => {
    dispatch(toggleRegisterModal())
  }
})

const mapStateToProps = (state: GlobalAppStateType) => ({
  allFeed: state.feed.allFeed,
  isFetching: state.global.fetching,
  firstLogin: state.auth.firstLogin,
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedComponent);