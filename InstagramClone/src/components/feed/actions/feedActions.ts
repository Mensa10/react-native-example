import { ActionCreator, Dispatch, AnyAction } from 'redux';

import { FeedContent } from "../../../helpers/types";
import { FetchFeedAction } from '../actions/interface';
import { FETCH_ALL_FEED } from "./types";
import { GlobalAppStateType } from '../../../redux/defaultState';
import { toggleIsFetching } from '../../global/actions/globalActions';

import Firebase from '../../../helpers/firebase';

const fetchAllFeed = (allFeed: FeedContent[] | null): FetchFeedAction => ({
  type: FETCH_ALL_FEED,
  allFeed,
})

export const getAllFeed: ActionCreator<any> = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(toggleIsFetching(true));
    const fire = new Firebase();
    const allFeed = await fire.getAllFeed();
    dispatch(fetchAllFeed(allFeed.reverse()));
    dispatch(toggleIsFetching(false));
  }
}


export const uploadFeed: ActionCreator<any> = (feed: FeedContent, nav: any) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => GlobalAppStateType) => {
    dispatch(toggleIsFetching(true));
    const currentUser = getState().auth.user;
    if (currentUser) {
      try {
        const fire = new Firebase();
        const uploadImage = await fire.uploadFile(feed.image.uri);
        const feedToUpload: FeedContent = {
          createdDate: Date.now(),
          userId: currentUser.id,
          userProfileImg: { uri: currentUser.profileImage.uri ? currentUser.profileImage.uri : '' },
          displayName: currentUser.displayName,
          image: { uri: uploadImage },
          title: feed.title,
        }
        alert(feedToUpload.image.uri);
        alert(feedToUpload.userProfileImg.uri);
        await fire.uploadFeed(feedToUpload);
        dispatch(toggleIsFetching(false));
        nav.navigate('Feed');
      } catch (error) {
        console.log(error);
        alert(error);
        dispatch(toggleIsFetching(false));
      }
    }
  }
}