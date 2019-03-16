'use strict';
import { AuthReducerStateType } from '../components/auth/reducers/authReducer';
import { GlobalReducerStateType } from '../components/global/reducers/globalReducer';

export interface GlobalAppStateType {
  auth: AuthReducerStateType;
  global: GlobalReducerStateType;
}

export default {
  auth: {
   user: null,
   firstLogin: false,
   error: null,
  },
  global: {
    fetching: false,
  }
};
