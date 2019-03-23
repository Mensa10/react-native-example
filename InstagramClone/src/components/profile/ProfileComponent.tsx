import * as React from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { NavigationInjectedProps } from 'react-navigation';

import { logOutUser } from '../auth/actions/authActions';
import { GlobalAppStateType } from '../../redux/defaultState';
import { User } from '../../helpers/types';
import AsyncImageLoader from '../global/components/AsyncImageLoader';

interface PropsType extends NavigationInjectedProps {
  logOut: (nav: any) => void;

  user: User | null;
}

const ProfileComponent = (props: PropsType) => {
  const { user, navigation } = props;
  if (!user) {
    navigation.navigate('Login');
    return null;
  }
  const logOutAction = () => {
    props.logOut(props.navigation);
  }
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.userText}>Welcome to your profile <Text style={styles.usernameText}>{user.displayName}</Text></Text>
        {user.profileImage &&
          <AsyncImageLoader
            source={user.profileImage}
            style={styles.profileImage}
            placeholder={require('../../assets/profilePlaceholder.jpg')}
          />
        }
        {!user.profileImage &&
          <AsyncImageLoader source={require('../../assets/profilePlaceholder.jpg')} style={styles.profileImage} />
        }
      </View>
      <Button title="Logout" onPress={logOutAction} />
    </View >
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
    marginBottom: 40,
  },
  userText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  usernameText: {
    fontWeight: 'bold',
  },
  userInfoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  }
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