import * as types from '../actions/types';
import defaultState from '../../../redux/defaultState';

import { FeedActionType } from '../actions/interface';
import { FeedContent } from '../../../helpers/types';

export interface FeedReducerStateType {
  allFeed: FeedContent[] | null;
}

export default (
  state: FeedReducerStateType = defaultState.feed,
  action: FeedActionType,
): FeedReducerStateType => {
  switch (action.type) {
    case types.FETCH_ALL_FEED:
      return ({
        ...state,
        allFeed: action.allFeed,
      });
    default:
      return state;
  }
};

