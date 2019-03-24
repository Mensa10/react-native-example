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
  private cloudinaryName = 'dthd6s5qg';
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudinaryName}/image/upload`

  uploadFeed = async (feed: FeedContent) => {
    try {
      const db = firebase.app().database!().ref('feed').child(feed.userId!);
      await db.push(feed);
    } catch (error) {
      throw error;
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

  uploadFile = async (uri: string) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const regex = new RegExp("^(http|https)://", "i");
    const data = new FormData();

    try {
      let file;
      if (regex.test(uri)) {
        file = uri;
        data.append('file', file);;
      } else {
        file = await fs.readFile(uploadUri, 'base64');
        data.append('file', `data:text/plain;base64,${file}`);;
      }

      data.append('upload_preset', 'bzcuonne');
      const response = await fetch(this.cloudinaryUrl, {
        method: 'POST',
        body: data,
      });
      const imgUrl = await response.json();
      return imgUrl.url;
    } catch (error) {
      throw error;
    }
  }
}

