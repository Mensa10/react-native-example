'use strict';
import { AuthReducerStateType } from '../components/auth/reducers/authReducer';
import { GlobalReducerStateType } from '../components/global/reducers/globalReducer';
import { FeedReducerStateType } from '../components/feed/reducers/feedReducer';

export interface GlobalAppStateType {
  auth: AuthReducerStateType;
  global: GlobalReducerStateType;
  feed: FeedReducerStateType,
}

export default {
  auth: {
   user: null,
   firstLogin: false,
   error: null,
   token: null,
   tokenFetch: true,
  },
  global: {
    fetching: false,
  },
  feed: {
    allFeed: null,
  }
};
