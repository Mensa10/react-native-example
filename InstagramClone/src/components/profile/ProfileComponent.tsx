import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { NavigationInjectedProps } from 'react-navigation';

import { logOutUser } from '../auth/actions/authActions';

interface PropsType extends NavigationInjectedProps {
  logOut: (nav: any) => void;
}

const ProfileComponent = (props: PropsType) => {
  const logOutAction = () => {
    props.logOut(props.navigation);
  }
  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={logOutAction}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
  }
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  logOut: (nav: any) => {
    dispatch(logOutUser(nav));
  }
})

export default connect(null, mapDispatchToProps)(ProfileComponent);