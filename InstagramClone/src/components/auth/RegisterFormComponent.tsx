import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';

import { formField, errorText } from '../../helpers';
import { RegisterSchema } from '../../helpers/validations';
import { User } from '../../helpers/types';

interface PropsType {
  submitForm: (user: User) => void;

  errorMessage: string | null;

  resetError: () => void;
}

const RegisterFormComponent = (props: PropsType) => (
  <Formik
    initialValues={{ username: '', password: '', repeatPassword: '' }}
    onSubmit={values => props.submitForm(values)}
    validationSchema={RegisterSchema}
  >
    {formikProps => {
      const usernameOnChange = (text: string) => {
        formikProps.setFieldValue('username', text)
        if (formikProps.submitCount > 0) {
          props.resetError();
        }
      }
      return (
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding" enabled>
          <TextInput
            onChangeText={usernameOnChange}
            onBlur={formikProps.handleBlur('username')}
            value={formikProps.values.username}
            style={styles.textInput}
            placeholder="Email"
          />
          {formikProps.errors.username && formikProps.touched.password &&
            <Text style={errorText}>{formikProps.errors.username}</Text>
          }
          <TextInput
            onChangeText={formikProps.handleChange('password')}
            onBlur={formikProps.handleBlur('password')}
            value={formikProps.values.password}
            style={styles.textInput}
            placeholder="Password"
            secureTextEntry={true}
          />
          {formikProps.errors.password && formikProps.touched.password &&
            <Text style={errorText}>{formikProps.errors.password}</Text>
          }
          <TextInput
            onChangeText={formikProps.handleChange('repeatPassword')}
            onBlur={formikProps.handleBlur('repeatPassword')}
            value={formikProps.values.repeatPassword}
            style={styles.textInput}
            placeholder="Repeat password"
            secureTextEntry={true}
          />
          {formikProps.errors.repeatPassword && formikProps.touched.repeatPassword &&
            <Text style={errorText}>{formikProps.errors.repeatPassword}</Text>
          }
          {props.errorMessage &&
            <Text style={errorText}>{props.errorMessage}</Text>

          }
          <TouchableOpacity style={styles.loginButton} onPress={formikProps.handleSubmit as any}>
            <Text style={styles.loginButtonText}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      )
    }}
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
  },
  registerContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  registerText: {
    color: '#FE697C',
  },
  errorMessage: errorText,
})

export default RegisterFormComponent;