import * as types from '../actions/types';
import defaultState from '../../../redux/defaultState';

import { GlobalActionType } from '../actions/interface';

export interface GlobalReducerStateType {
  fetching: boolean;
}

export default (
  state: GlobalReducerStateType = defaultState.global,
  action: GlobalActionType,
): GlobalReducerStateType => {
  switch (action.type) {
    case types.IS_FETCHING:
    return {
      ...state,
      fetching: action.fetching,
    }
    default:
      return state;
  }
};

