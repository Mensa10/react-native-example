import * as types from '../actions/types';
import defaultState from '../../../redux/defaultState';

import { AuthActionType } from '../actions/interface';
import { User } from '../../../helpers/types';

export interface AuthReducerStateType {
  user: User | null;

  firstLogin: boolean;

  error: string | null;

  token: string | null;

  tokenFetch: boolean;
}

export default (
  state: AuthReducerStateType = defaultState.auth,
  action: AuthActionType,
): AuthReducerStateType => {
  switch (action.type) {
    case types.REGISTER_USER:
      return ({
        ...state,
        user: action.data,
      });
    case types.SET_ERROR_MESSAGE:
    return ({
      ...state,
      error: action.error,
    })
    case types.SET_USER_TOKEN: 
    return ({
      ...state,
      token: action.token,
      tokenFetch: action.tokenFetch,
    })
    default:
      return state;
  }
};

