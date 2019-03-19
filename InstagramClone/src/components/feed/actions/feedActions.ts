import { ActionCreator, Dispatch, AnyAction } from 'redux';
import { FeedContent } from "../../../helpers/types";
import { FetchFeedAction } from '../actions/interface';
import { FETCH_ALL_FEED } from "./types";
import { GlobalAppStateType } from '../../../redux/defaultState';

import Firebase from '../../../helpers/firebase';

const fetchAllFeed = (allFeed: FeedContent[] | null): FetchFeedAction => ({
  type: FETCH_ALL_FEED,
  allFeed,
})

export const getAllFeed: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    const fire = new Firebase();
    const allFeed = await fire.getAllFeed();
    dispatch(fetchAllFeed(allFeed.reverse()));
  }
}


export const uploadFeed: ActionCreator<any> = (feed: FeedContent) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => GlobalAppStateType) => {
    const currentUser = getState().auth.user;
    if (currentUser) {
      const fire = new Firebase();
      feed.createdDate = Date.now();
      feed.userId = currentUser.id;
      feed.userProfileImg = currentUser.profileImage;
      await fire.uploadFeed(feed);
    }
  }
}