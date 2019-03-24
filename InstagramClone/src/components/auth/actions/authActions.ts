import { AnyAction, Dispatch, ActionCreator } from 'redux';
import * as types from './types';
import { User } from '../../../helpers/types';
import { toggleIsFetching } from '../../global/actions/globalActions';
import { SetUserToken } from './interface';
import { GlobalAppStateType } from '../../../redux/defaultState';
import { storeToken, getStoreToken, clearStorage } from '../../../helpers/storage';
import Firebase from '../../../helpers/firebase';

const apiKey = 'AIzaSyCU1S31Yfw9qSmxVdNThme3Q_B6uUQfdOg';
const registerUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
const loginUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
const updateUserUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/setAccountInfo?key=${apiKey}`
const getUserDataUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${apiKey}`

const loginUser = (user: User | null) => ({
  type: types.REGISTER_USER,
  user,
})

const logOut = () => ({
  type: types.LOGOUT_USER,
})

export const setErrorMessage = (error: string | null) => ({
  type: types.SET_ERROR_MESSAGE,
  error,
})

const setUserToken = (token: string | null, tokenFetch: boolean): SetUserToken => ({
  type: types.SET_USER_TOKEN,
  token,
  tokenFetch,
})

export const registerUserAction: ActionCreator<any> = (user: User, nav: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(toggleIsFetching(true));
    const userDetails = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    }
    try {
      const res = await fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })
      const finalRes = await res.json();
      if (finalRes.error) {
        if (finalRes.error.message === 'EMAIL_EXISTS') {
          dispatch(setErrorMessage('Email already exists!'))
          dispatch(toggleIsFetching(false));
        }
        return;
      }
      user.id = finalRes.idToken;
      let profileImgUrl = '';
      if (user.profileImage!.uri) {
        profileImgUrl = await new Firebase().uploadFile(user.profileImage!.uri);
      }
      const updateUser = {
        idToken: user.id,
        displayName: user.displayName,
        photoUrl: profileImgUrl,
        returnSecureToken: true,
      }
      await fetch(updateUserUrl, {
        method: 'POST',
        body: JSON.stringify(updateUser),
      })
      await storeToken(finalRes.idToken);
      dispatch(toggleIsFetching(false));
      dispatch(setUserToken(finalRes.idToken, false));
      dispatch(loginUser(user))
      nav.navigate('Feed');
    } catch (error) {
      console.log(error);
      dispatch(toggleIsFetching(false));
    }
  }
}

export const loginUserAction: ActionCreator<any> = (user: User, nav: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(toggleIsFetching(true));
    const userDetails = {
      email: user.email,
      password: user.password,
      returnSecureToken: true,
    }
    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })
      const finalRes = await res.json();
      if (finalRes.error) {
        if (finalRes.error.message === 'EMAIL_NOT_FOUND') {
          dispatch(setErrorMessage('Email not found!'));
        }
        if (finalRes.error.message === 'INVALID_PASSWORD') {
          dispatch(setErrorMessage('Invalid password!'))
        }
        dispatch(toggleIsFetching(false));
        return;
      }
      await storeToken(finalRes.idToken);
      user.id = finalRes.idToken;
      const getUserData = await fetch(getUserDataUrl, {
        method: 'POST',
        body: JSON.stringify({ idToken: user.id }),
      })
      const userData = await getUserData.json();
      
      const loggedInUser: User = {
        displayName: userData.users[0].displayName,
        profileImage: { uri: userData.users[0].photoUrl },
        ...user,
      }
      dispatch(toggleIsFetching(false));
      dispatch(loginUser(loggedInUser));
      dispatch(setUserToken(finalRes.idToken, false));
      nav.navigate('Feed');
    } catch (error) {
      console.log(error);
      dispatch(toggleIsFetching(false));
    }
  }
}


export const loggedInStatus: ActionCreator<any> = (nav: any) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => GlobalAppStateType) => {
    let token = getState().auth.token;
    if (!token) {
      token = await getStoreToken();
      dispatch(setUserToken(token, false));
    }

    if (token) {
      const getUserData = await fetch(getUserDataUrl, {
        method: 'POST',
        body: JSON.stringify({ idToken: token }),
      })
      const userData = await getUserData.json();
      const loggedInUser: User = {
        displayName: userData.users[0].displayName,
        profileImage: { uri: userData.users[0].photoUrl },
        email: userData.users[0].email,
        password: userData.users[0].passwordHash,
        id: userData.users[0].localId,
      }
      dispatch(loginUser(loggedInUser));
      nav.navigate('Feed');
    }
    dispatch(setUserToken(token, false));
    return;
  }
}

export const logOutUser: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    await clearStorage();
    dispatch(logOut());
  }
}