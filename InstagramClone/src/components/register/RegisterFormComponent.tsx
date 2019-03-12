import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Formik } from 'formik';

import { formField } from '../../helpers';

const RegisterFormComponent = (props: any) => (
  <Formik
    initialValues={{ firstName: '', lastName: '', username: '', password: '', repeatPassword: '' }}
    onSubmit={values => alert(values.username)}
  >
    {formikProps => (
      <View style={styles.formContainer}>
        <TextInput
          onChangeText={formikProps.handleChange('firstName')}
          onBlur={formikProps.handleBlur('firstName')}
          value={formikProps.values.firstName}
          style={styles.textInput}
          placeholder="First name"
        />
         <TextInput
          onChangeText={formikProps.handleChange('lastName')}
          onBlur={formikProps.handleBlur('lastName')}
          value={formikProps.values.lastName}
          style={styles.textInput}
          placeholder="Last name"
        />
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
        <TextInput
          onChangeText={formikProps.handleChange('repeatPassword')}
          onBlur={formikProps.handleBlur('repeatPassword')}
          value={formikProps.values.repeatPassword}
          style={styles.textInput}
          placeholder="Repeat password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.loginButton} onPress={formikProps.handleSubmit as any}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    width: '100%'
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

export default RegisterFormComponent;