import * as React from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Formik, FormikProps } from 'formik';
import ImagePicker from 'react-native-image-picker';

import { formField, errorText } from '../../helpers';
import { uploadContentSchema } from '../../helpers/validations';
import { FeedContent } from '../../helpers/types';

interface PropsType {
  upload: (feed: FeedContent, formikProps: FormikProps<any>) => void;

  isFetching: boolean;
}

const UploadFormComponent = (props: PropsType) => {
  const uploadAction = async (values: any, formik: any) => {
    props.upload(values, formik);
  }
  return (
    <Formik
      initialValues={{ image: { uri: 'https://loremflickr.com/640/360' }, title: '', }}
      onSubmit={uploadAction}
      validationSchema={uploadContentSchema}
    >
      {formikProps => {
        const onProfileImageAction = () => {
          ImagePicker.showImagePicker({ quality: 0.5 }, (res: any) => {
            if (res.didCancel) {
              console.log('User canceled');
            } else if (res.error) {
              alert(res.error);
            } else {
              const source = { uri: res.uri };
              formikProps.setFieldValue('image', source);
            }
          })
        }
        return (
          <View style={styles.formContainer}>
            <Image source={formikProps.values.image} style={styles.profileImage} />
            {formikProps.errors.image && formikProps.touched.image &&
              <Text style={errorText}>{formikProps.errors.image}</Text>
            }
            <TouchableOpacity style={styles.uploadImageButton} onPress={onProfileImageAction}>
              <Text style={styles.loginButtonText}>Add image</Text>
            </TouchableOpacity>
            <TextInput
              onChangeText={formikProps.handleChange('title')}
              onBlur={formikProps.handleBlur('title')}
              value={formikProps.values.title}
              style={styles.textInput}
              placeholder="Title"
            />
            {formikProps.errors.title && formikProps.touched.title &&
              <Text style={errorText}>{formikProps.errors.title}</Text>
            }
            {!props.isFetching &&
              <TouchableOpacity style={styles.loginButton} onPress={formikProps.handleSubmit as any}>
                <Text style={styles.loginButtonText}>Upload</Text>
              </TouchableOpacity>
            }
            {props.isFetching &&
              <View style={styles.activityContainer}>
                <ActivityIndicator size="large" color="#FE697C" />
              </View>
            }
          </View>
        )
      }}
    </Formik>
  )
};

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
  },
  profileImage: {
    height: 200,
    width: '100%',
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

export default UploadFormComponent;
