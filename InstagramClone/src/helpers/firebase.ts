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
  private cloudinaryUrl = `https://api.cloudinary.com/v1_1/ministry-of-programming/image/upload`

  uploadFeed = async (feed: FeedContent) => {
    try {
      const db = firebase.app().database!().ref('feed').child(`${feed.displayName!}`);
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
    if (!uri) return;
    const uploadUri = uri.replace('file://', '');
    const regex = new RegExp("^(http|https)://", "i");
    const formData = [{ name: 'upload_preset', data: 'j6c51ecn' }];

    try {
      let file;
      if (regex.test(uri)) {
        file = uri;
        formData.push({ name: 'file', data: file })
      } else {
        file = await fs.readFile(uploadUri, 'base64');
        formData.push({ name: 'file', data: `data:text/plain;base64,${file}` });
      }

      const request = await RNFetchBlob.fetch('POST', this.cloudinaryUrl, {
        'Content-Type': 'multipart/form-data'
      }, formData)

      return request.data;
    } catch (error) {
      throw error;
    }
  }
}

