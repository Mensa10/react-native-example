import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';

import { formField, errorText } from '../../helpers';
import { RegisterSchema } from '../../helpers/validations';

const RegisterFormComponent = (props: any) => (
  <Formik
    initialValues={{ firstName: '', lastName: '', username: '', password: '', repeatPassword: '' }}
    onSubmit={values => alert(values.username)}
    validationSchema={RegisterSchema}
  >
    {formikProps => (
      <KeyboardAvoidingView style={styles.formContainer} behavior="padding" enabled>
        <TextInput
          onChangeText={formikProps.handleChange('firstName')}
          onBlur={formikProps.handleBlur('firstName')}
          value={formikProps.values.firstName}
          style={styles.textInput}
          placeholder="First name"
        />
         {formikProps.errors.firstName && formikProps.touched.firstName && 
          <Text style={errorText}>{formikProps.errors.firstName}</Text>
        }
         <TextInput
          onChangeText={formikProps.handleChange('lastName')}
          onBlur={formikProps.handleBlur('lastName')}
          value={formikProps.values.lastName}
          style={styles.textInput}
          placeholder="Last name"
        />
         {formikProps.errors.lastName && formikProps.touched.lastName && 
          <Text style={errorText}>{formikProps.errors.lastName}</Text>
        }
        <TextInput
          onChangeText={formikProps.handleChange('username')}
          onBlur={formikProps.handleBlur('username')}
          value={formikProps.values.username}
          style={styles.textInput}
          placeholder="Username"
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
        <TouchableOpacity style={styles.loginButton} onPress={formikProps.handleSubmit as any}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  },
  errorMessage: errorText,
})

export default RegisterFormComponent;