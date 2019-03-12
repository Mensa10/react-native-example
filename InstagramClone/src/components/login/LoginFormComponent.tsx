import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Formik } from 'formik';

const LoginFormComponent = () => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={values => alert(values.username)}
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
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginButton} onPress={props.handleSubmit as any}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>If you don't have an account register </Text>
          <TouchableOpacity>
            <Text style={styles.registerText}>here.</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
    height: 50,
    borderBottomColor: 'red',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginBottom: 10,
    padding: 15,
    backgroundColor: 'white'
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#FE697C',
    padding: 20,
    width: '50%',
    borderRadius: 20,
  },
  loginButtonText: {
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase',
  },
  registerContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  registerText: {
    color: '#FE697C',
  }
})

export default LoginFormComponent;