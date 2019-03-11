import * as React from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

const LoginFormComponent = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={values => console.log(values)}
  >
    {props => (
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={props.handleChange('username')}
          onBlur={props.handleBlur('username')}
          value={props.values.username}
          style={styles.textInput}
          placeholder="Username"
        />
        <TextInput
          onChangeText={props.handleChange('password')}
          onBlur={props.handleBlur('password')}
          value={props.values.password}
          style={styles.textInput}
          placeholder="Password"
        />
        <Button onPress={props.handleSubmit as any} title="Submit" color="red"/>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  textInput: {
    width: '50%',
    height: 50,
    borderBottomColor: 'red'
  },
  loginButton: {
    marginTop: 20,
  }
})

export default LoginFormComponent;