'use strict';
import { combineReducers } from 'redux';

import auth from '../components/auth/reducers/authReducer';

export default combineReducers({
  auth,
});
