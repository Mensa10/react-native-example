import * as types from '../actions/types';
import defaultState from '../../../redux/defaultState';

import { AuthActionType } from '../actions/interface';
import { User } from '../../../helpers/types';

export interface AuthReducerStateType {
  user: User | null;
  firstLogin: boolean;
  error: string | null;
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
    default:
      return state;
  }
};

