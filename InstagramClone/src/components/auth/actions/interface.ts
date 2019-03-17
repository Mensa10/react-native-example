import { User } from '../../../helpers/types'

export interface RegisterUser {
  type: 'REGISTER_USER';

  data: User;
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

export type AuthActionType =
  | RegisterUser
  | SetErrorMessage
  | SetUserToken;
