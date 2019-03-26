import { User } from '../../../helpers/types'

export interface RegisterUser {
  type: 'REGISTER_USER';

  user: User;

  firstLogin: boolean;
}

export interface SetErrorMessage {
  type: 'SET_ERROR_MESSAGE';

  error: string | null;
}

export interface SetUserToken {
  type: 'SET_USER_TOKEN';

  token: string | null;

  tokenFetch: boolean;
}

export interface LogOutUser {
  type: 'LOGOUT_USER'
}

export interface ToggleRegisterModal {
  type: 'TOGGLE_REGISTER_MODAL'
}

export type AuthActionType =
  | RegisterUser
  | SetErrorMessage
  | SetUserToken
  | LogOutUser
  | ToggleRegisterModal;
