import * as React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { NavigationInjectedProps } from 'react-navigation';

import RegisterFormComponent from './RegisterFormComponent';
import { User } from '../../helpers/types';
import { registerUserAction, setErrorMessage } from './actions/authActions';
import { GlobalAppStateType } from '../../redux/defaultState';
const appLogo = require('../../assets/app-logo.png');

interface PropsType extends NavigationInjectedProps {
  registerUser: (user: User, nav: any) => void;

  errorMessage: string | null;

  resetError: () => void;

  isFetching: boolean;
}

class RegisterComponent extends React.PureComponent<PropsType, {}> {
  submitForm = (user: User) => {
    this.props.registerUser(user, this.props.navigation);
  }

  goBack = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Register with us</Text>
          <Image source={appLogo} style={styles.headerLogo} />
        </View>
        <ScrollView style={{ width: '100%' }}>
          <RegisterFormComponent
            submitForm={this.submitForm}
            errorMessage={this.props.errorMessage}
            resetError={this.props.resetError}
            isFetching={this.props.isFetching}
          />
        </ScrollView>
        <Button title="Back" onPress={this.goBack} />
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
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
  registerUser: (user: User, nav: any) => {
    dispatch(registerUserAction(user, nav));
  },
  resetError: () => {
    dispatch(setErrorMessage(null));
  }
})

const mapStateToProps = (state: GlobalAppStateType) => ({
  errorMessage: state.auth.error,
  isFetching: state.global.fetching,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterComponent);