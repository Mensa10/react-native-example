import { AnyAction, Dispatch, ActionCreator } from 'redux';
import * as types from './types';
import { User } from '../../../helpers/types';
import { toggleIsFetching } from '../../global/actions/globalActions';
import { SetUserToken } from './interface';
import { GlobalAppStateType } from '../../../redux/defaultState';
import { storeToken, getStoreToken, clearStorage } from '../../../helpers/storage';

const apiKey = 'AIzaSyCU1S31Yfw9qSmxVdNThme3Q_B6uUQfdOg';
const registerUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
const loginUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

const loginUser = (user: User | null) => ({
  type: types.REGISTER_USER,
  user,
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
      email: user.username,
      password: user.password,
      returnSecureToken: true,
    }
    try {
      const res = await fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })
      const finalRes = await res.json();
      dispatch(toggleIsFetching(false));
      if (finalRes.error) {
        if (finalRes.error.message === 'EMAIL_EXISTS') {
          dispatch(setErrorMessage('Email already exists!'))
        }
        return;
      }
      dispatch(setUserToken(finalRes.idToken, false));
      user.id = finalRes.localId;
      await storeToken(finalRes.idToken);
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
      email: user.username,
      password: user.password,
      returnSecureToken: true,
    }
    try {
      const res = await fetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(userDetails),
      })
      const finalRes = await res.json();
      dispatch(toggleIsFetching(false));
      if (finalRes.error) {
        if (finalRes.error.message === 'EMAIL_NOT_FOUND') {
          dispatch(setErrorMessage('Email not found!'))
        }
        if (finalRes.error.message === 'INVALID_PASSWORD') {
          dispatch(setErrorMessage('Invalid password!'))
        }
        return;
      }
      dispatch(setUserToken(finalRes.idToken, false));
      await storeToken(finalRes.idToken);
      user.id = finalRes.localId;
      dispatch(loginUser(user))
      nav.navigate('Feed');
    } catch (error) {
      console.log(error);
      dispatch(toggleIsFetching(false));
    }
  }
}


export const loggedInStatus: ActionCreator<any> = (nav: any) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => GlobalAppStateType) => {
    const token = getState().auth.token;
    if (!token) {
      const storeToken = await getStoreToken();
      dispatch(setUserToken(storeToken, false));
      if (storeToken) {
        nav.navigate('Feed');
        return;
      }
    }
    dispatch(setUserToken(token, false));
  }
}

export const logOutUser: ActionCreator<any> = (nav: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    await clearStorage();
    dispatch(loginUser(null));
    dispatch(setUserToken(null, false));
    nav.navigate('Login');
  }
}