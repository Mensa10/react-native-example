import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';

import { formField, errorText } from '../../helpers';
import { LoginSchema } from '../../helpers/validations';
import { User } from '../../helpers/types';

interface PropsType {
  navigate: (route: string) => void;
}

interface PropsType {
  loginUser: (user: User) => void;
  resetError: () => void;
  error: string | null;
  navigate: (route: string) => void;
  isFetching: boolean;
}

const LoginFormComponent = (props: PropsType) => {
  const toRegister = () => {
    props.navigate('Register');
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={values => props.loginUser(values)}
      validationSchema={LoginSchema}
    >
      {formikProps => {
        const usernameOnChange = (text: string) => {
          formikProps.setFieldValue('username', text)
          if (formikProps.submitCount > 0) {
            props.resetError();
          }
        }

        const passwordOnChange = (text: string) => {
          formikProps.setFieldValue('password', text)
          if (formikProps.submitCount > 0) {
            props.resetError();
          }
        }
        return (
          <View style={styles.formContainer}>
            <TextInput
              onChangeText={usernameOnChange}
              onBlur={formikProps.handleBlur('username')}
              value={formikProps.values.username}
              style={styles.textInput}
              placeholder="Email"
            />
            {formikProps.errors.username && formikProps.touched.username &&
              <Text style={errorText}>{formikProps.errors.username}</Text>
            }
            <TextInput
              onChangeText={passwordOnChange}
              onBlur={formikProps.handleBlur('password')}
              value={formikProps.values.password}
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={true}
            />
            {formikProps.errors.password && formikProps.touched.password &&
              <Text style={errorText}>{formikProps.errors.password}</Text>
            }
            {props.error &&
              <Text style={errorText}>{props.error}</Text>
            }
            {props.isFetching &&
              <View style={styles.activityContainer}>
                <ActivityIndicator size="large" color="#FE697C" />
              </View>
            }
            {!props.isFetching &&
              <TouchableOpacity style={styles.loginButton} onPress={formikProps.handleSubmit as any}>
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>
            }
            <View style={styles.registerContainer}>
              <Text>If you don't have an account register </Text>
              <TouchableOpacity onPress={toRegister}>
                <Text style={styles.registerText}>here.</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }}
    </Formik>
  )
};

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
    color: '#fff',
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  registerText: {
    color: '#FE697C',
  },
  errorMessage: errorText,
  activityContainer: {
    marginTop: 20,
  }
})

export default LoginFormComponent;
