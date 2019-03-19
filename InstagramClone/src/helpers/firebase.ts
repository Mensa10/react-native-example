import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { firebase } from '@firebase/app'
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/app';
import '@firebase/database';

import { FeedContent } from './types';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
const w = window as any
w.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
w.Blob = Blob;

export default class Firebase {
  uploadFeed = async (feed: FeedContent) => {
    try {
      const db = firebase.app().database!().ref('feed').child(feed.userId!);
      const res = await db.push(feed);
    } catch (error) {
      //Todo
    }
  }

  getAllFeed = async () => {
    const responseArray: any = [];
    try {
      const db = firebase.app().database!().ref('/feed');
      await db.once('value').then(snapshot => {
        snapshot.forEach((child) => {
          const keys = Object.keys(child.val());
          if (keys[0] === 'image') {
            responseArray.push(child.val())
          } else {
            child.forEach((subChild) => {
              responseArray.push(subChild.val())
            })
          }
        })
      })
      return responseArray;
    } catch (error) {
      
    }
  }

  uploadImage = (uri: string, mime = 'image/jpeg', name: string) => {

    return new Promise((resolve, reject) => {
      let imgUri = uri; 
      let uploadBlob: any = null;
      const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
      const imageRef = firebase.app().storage!(`gs://instagram-clone-85e2c.appspot.com/`).ref(name);
      
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