'use strict';
import { combineReducers } from 'redux';

import auth from '../components/auth/reducers/authReducer';
import global from '../components/global/reducers/globalReducer';

export default combineReducers({
  auth,
  global,
});
