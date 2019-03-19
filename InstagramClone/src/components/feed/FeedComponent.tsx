import * as React from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { NavigationInjectedProps } from 'react-navigation';

import FeedItemComponent from './FeedItemComponent';
import LoaderComponent from '../global/LoaderComponent';
import { getAllFeed } from './actions/feedActions';
import { GlobalAppStateType } from '../../redux/defaultState';
import { FeedContent } from '../../helpers/types';

interface PropsType extends NavigationInjectedProps {
  getAll: () => void;

  allFeed: FeedContent[] | null;
}

class FeedComponent extends React.PureComponent<PropsType, {}> {
  componentWillMount() {
    this.props.navigation.addListener('didFocus', () => {
      this.props.getAll();
    })
  }
  render() {
    const { allFeed } = this.props;

    if (!allFeed) {
      return <LoaderComponent />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={allFeed}
          renderItem={(feed) => <FeedItemComponent feed={feed}/>}
          keyExtractor={(feed) => feed.title}
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  getAll: () => {
    dispatch(getAllFeed())
  }
})

const mapStateToProps = (state: GlobalAppStateType) => ({
  allFeed: state.feed.allFeed,
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedComponent);