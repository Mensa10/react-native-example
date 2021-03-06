import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, Image, Button } from 'react-native';
import { Formik } from 'formik';
import ImagePicker from 'react-native-image-picker';

import { formField, errorText } from '../../helpers';
import { RegisterSchema } from '../../helpers/validations';
import { User } from '../../helpers/types';

const profilePlaceholder = require('../../assets/profilePlaceholder.jpg');

interface PropsType {
  submitForm: (user: User) => void;

  errorMessage: string | null;

  resetError: () => void;

  isFetching: boolean;
}

const RegisterFormComponent = (props: PropsType) => (
  <Formik
    initialValues={{ profileImage:profilePlaceholder, email: '', displayName: '', password: '', repeatPassword: '' }}
    onSubmit={values => props.submitForm(values)}
    validationSchema={RegisterSchema}
  >
    {formikProps => {
      const emailOnChange = (text: string) => {
        formikProps.setFieldValue('email', text)
        if (formikProps.submitCount > 0) {
          props.resetError();
        }
      }

      const onProfileImageAction = () => {
        ImagePicker.showImagePicker({maxWidth: 200, maxHeight: 200}, (res: any) => {
          if (res.didCancel) {
            console.log('User canceled');
          } else if (res.error) {
            alert(res.error);
          } else {
            const source = { uri: res.uri};
            formikProps.setFieldValue('profileImage', source);
          }
        })
      }
      return (
        <KeyboardAvoidingView style={styles.formContainer} behavior="padding" enabled>
          <Image source={formikProps.values.profileImage} style={styles.profileImage} />
          <TouchableOpacity style={styles.uploadImageButton} onPress={onProfileImageAction}>
              <Text style={styles.loginButtonText}>Add profile image</Text>
            </TouchableOpacity>
          <TextInput
            onChangeText={emailOnChange}
            onBlur={formikProps.handleBlur('email')}
            value={formikProps.values.email}
            style={styles.textInput}
            placeholder="Email"
          />
          {formikProps.errors.email && formikProps.touched.password &&
            <Text style={errorText}>{formikProps.errors.email}</Text>
          }
          <TextInput
            onChangeText={formikProps.handleChange('displayName')}
            onBlur={formikProps.handleBlur('displayName')}
            value={formikProps.values.displayName}
            style={styles.textInput}
            placeholder="Display name"
          />
          {formikProps.errors.displayName && formikProps.touched.password &&
            <Text style={errorText}>{formikProps.errors.displayName}</Text>
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
          {props.isFetching &&
            <View style={styles.activityContainer}>
              <ActivityIndicator size="large" color="#FE697C" />
            </View>
          }
          {!props.isFetching &&
            <TouchableOpacity style={styles.loginButton} onPress={formikProps.handleSubmit as any}>
              <Text style={styles.loginButtonText}>REGISTER</Text>
            </TouchableOpacity>
          }

        </KeyboardAvoidingView>
      )
    }}
  </Formik>
);

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
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
  activityContainer: {
    marginTop: 20,
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderColor: '#f1f1f1',
    borderWidth: 0.4,
    marginBottom: 10,
  },
  uploadImageButton: {
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: '#FE697C',
    padding: 10,
    width: '50%',
    borderRadius: 20,
  },
})

export default RegisterFormComponent;