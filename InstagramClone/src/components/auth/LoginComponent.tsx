import * as React from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { NavigationEventsProps } from 'react-navigation';

import LoginFormComponent from './LoginFormComponent';
import { GlobalAppStateType } from '../../redux/defaultState';
import { User } from '../../helpers/types';
import { loginUserAction, setErrorMessage } from './actions/authActions';
const AppLogo = require('../../assets/app-logo.png');

interface PropsType extends NavigationEventsProps {
  loginUser: (user: User, nav: any) => void;
  resetError: () => void;
  error: string | null;
  isFetching: boolean;
}

class LoginComponent extends React.PureComponent<PropsType, {}> {
  navigate = (route: string) => {
    this.props.navigation!.navigate(route);
  }

  loginUser = (user: User) => {
    this.props.loginUser(user, this.props.navigation);
  }

  render() {
    return (
      <SafeAreaView style={styles.loginContainer}>
        <View style={styles.test}>
          <Image source={AppLogo} style={styles.image} />
          <KeyboardAvoidingView style={styles.formContainer} behavior="padding" enabled>
            <LoginFormComponent
              navigate={this.navigate}
              loginUser={this.loginUser}
              resetError={this.props.resetError}
              error={this.props.error}
              isFetching={this.props.isFetching}
            />
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    )
  }
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  image: {
    marginTop: 70,
  },
  test: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    flexDirection: 'column',
    width: '100%',
  }
})

const mapStateToProps = (state: GlobalAppStateType) => ({
  error: state.auth.error,
  isFetching: state.global.fetching,
})

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  loginUser: (user: User, nav: any) => {
    dispatch(loginUserAction(user, nav));
  },
  resetError: () => {
    dispatch(setErrorMessage(null));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);