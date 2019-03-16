import { AnyAction, Dispatch, ActionCreator } from 'redux';
import * as types from './types';
import { User } from '../../../helpers/types';

const apiKey = 'AIzaSyCU1S31Yfw9qSmxVdNThme3Q_B6uUQfdOg';
const registerUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
const loginUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;

const loginUser = (user: User) => ({
  type: types.REGISTER_USER,
  user,
})

export const setErrorMessage = (error: string | null) => ({
  type: types.SET_ERROR_MESSAGE,
  error,
})

export const registerUserAction: ActionCreator<any> = (user: User) => {
  return async (dispatch: Dispatch<AnyAction>) => {
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
      if (finalRes.error) {
        if (finalRes.error.message === 'EMAIL_EXISTS') {
          dispatch(setErrorMessage('Email already exists!'))
        }
        return;
      }
      user.id = finalRes.localId;
      dispatch(loginUser(user))
    } catch (error) {
      console.log(error);
    }
  }
}

export const loginUserAction: ActionCreator<any> = (user: User, nav: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
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
      if (finalRes.error) {
        if (finalRes.error.message === 'EMAIL_NOT_FOUND') {
          dispatch(setErrorMessage('Email not found!'))
        }
        if (finalRes.error.message === 'INVALID_PASSWORD') {
          dispatch(setErrorMessage('Invalid password!'))
        }
        return;
      }
      user.id = finalRes.localId;
      dispatch(loginUser(user))
      nav.navigate('Feed');
    } catch (error) {
      console.log(error);
    }

  }
}