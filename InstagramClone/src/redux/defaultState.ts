'use strict';
import { AuthReducerStateType } from '../components/auth/reducers/authReducer';

export interface GlobalAppStateType {
  auth: AuthReducerStateType;
}

export default {
  auth: {
   user: null,
   firstLogin: false,
   error: null,
  },
};
