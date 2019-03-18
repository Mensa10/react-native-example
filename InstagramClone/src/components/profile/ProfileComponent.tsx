import * as React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { NavigationInjectedProps } from 'react-navigation';

import { logOutUser } from '../auth/actions/authActions';
import { GlobalAppStateType } from '../../redux/defaultState';
import { User } from '../../helpers/types';

interface PropsType extends NavigationInjectedProps {
  logOut: (nav: any) => void;

  user: User | null;
}

const ProfileComponent = (props: PropsType) => {
  const { user } = props;
  if (!user) {
    return null;
  }
  console.log(props.user);
  const logOutAction = () => {
    props.logOut(props.navigation);
  }
  return (
    <View style={styles.container}>
      {user.profileImage &&
        <Image source={user.profileImage} style={styles.profileImage} />
      }
      {!user.profileImage &&
        <Image source={require('../../assets/profilePlaceholder.jpg')} style={styles.profileImage} />
      }
      <Text>{user.displayName}</Text>
      <Button title="Logout" onPress={logOutAction} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: '#f1f1f1',
    borderWidth: 0.4,
    marginBottom: 10,
  },
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  logOut: (nav: any) => {
    dispatch(logOutUser(nav));
  }
})

const mapStateToProps = (state: GlobalAppStateType) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);