import * as firebase from 'firebase';
import { Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
const w = window as any
w.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
w.Blob = Blob;

export default class Firebase {

  private config = {
    apiKey: "AIzaSyCU1S31Yfw9qSmxVdNThme3Q_B6uUQfdOg",
    authDomain: "instagram-clone-85e2c.firebaseapp.com",
    databaseURL: "https://instagram-clone-85e2c.firebaseio.com",
    projectId: "instagram-clone-85e2c",
    storageBucket: "instagram-clone-85e2c.appspot.com",
    messagingSenderId: "558126075324",
  }

  constructor() {
    firebase.initializeApp(this.config);
  }

  uploadImage = (uri: string, mime = 'image/jpeg', name: string) => {

    return new Promise((resolve, reject) => {
      let imgUri = uri; 
      let uploadBlob: any = null;
      const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
      const imageRef = firebase.app().storage(`gs://instagram-clone-85e2c.appspot.com/`).ref(name);

      fs.readFile(uploadUri, 'base64')
        .then(data => {
          const b = Blob as any;
          return b.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime });
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error)
      })
    })
  }
}