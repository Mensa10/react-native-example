import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import RegisterFormComponent from './RegisterFormComponent';
import { User } from '../../helpers/types';
import { registerUserAction, setErrorMessage } from './actions/authActions';
import { GlobalAppStateType } from '../../redux/defaultState';
const appLogo = require('../../assets/app-logo.png');

interface PropsType {
  registerUser: (user: User) => void;

  errorMessage: string | null;

  resetError: () => void;
}

class RegisterComponent extends React.PureComponent<PropsType, {}> {
  submitForm = (user: User) => {
    this.props.registerUser(user);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Register with us</Text>
          <Image source={appLogo} style={styles.headerLogo} />
        </View>
        <RegisterFormComponent 
          submitForm={this.submitForm}
          errorMessage={this.props.errorMessage}
          resetError={this.props.resetError}
        />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 32,
  },
  headerLogo: {
    height: 40,
    width: 40,
  }
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => ({
  registerUser: (user: User) => {
    dispatch(registerUserAction(user));
  },
  resetError: () => {
    dispatch(setErrorMessage(null));
  }
})

const mapStateToProps = (state: GlobalAppStateType) => ({
  errorMessage: state.auth.error,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);