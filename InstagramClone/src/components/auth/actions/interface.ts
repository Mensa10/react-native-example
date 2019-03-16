import { User } from '../../../helpers/types'

export interface RegisterUser {
  type: 'REGISTER_USER';

  data: User;
}

export interface SetErrorMessage {
  type: 'SET_ERROR_MESSAGE';

  error: string | null;
}
export type AuthActionType =
  | RegisterUser
  | SetErrorMessage;
