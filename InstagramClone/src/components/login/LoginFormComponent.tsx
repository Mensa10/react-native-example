import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Formik } from 'formik';

import { formField } from '../../helpers';

interface PropsType {
  toRegister: () => void;
}

const LoginFormComponent = (props: PropsType) => (
  <Formik
    initialValues={{ username: '', password: '' }}
    onSubmit={values => alert(values.username)}
  >
    {formikProps => (
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={formikProps.handleChange('username')}
          onBlur={formikProps.handleBlur('username')}
          value={formikProps.values.username}
          style={styles.textInput}
          placeholder="Username"
        />
        <TextInput
          onChangeText={formikProps.handleChange('password')}
          onBlur={formikProps.handleBlur('password')}
          value={formikProps.values.password}
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginButton} onPress={formikProps.handleSubmit as any}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>If you don't have an account register </Text>
          <TouchableOpacity onPress={props.toRegister}>
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
  textInput: formField,
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