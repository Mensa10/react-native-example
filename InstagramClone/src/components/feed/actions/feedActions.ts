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


export const uploadFeed: ActionCreator<any> = (feed: FeedContent, nav: any, formik:any) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => GlobalAppStateType) => {
    dispatch(toggleIsFetching(true));
    const currentUser = getState().auth.user;
    if (currentUser) {
      const fire = new Firebase();
      const uploadImage = await fire.uploadImage(feed.image.uri, 'image/jpeg', `${currentUser.id}-uploadImg`);
      console.log(uploadImage);
      feed.createdDate = Date.now();
      feed.userId = currentUser.id;
      feed.userProfileImg = currentUser.profileImage;
      feed.displayName = currentUser.displayName;
      if (uploadImage) {
        feed.image.uri = uploadImage as string;
      }
      try {
        await fire.uploadFeed(feed);
        dispatch(toggleIsFetching(false));
        formik.setErrors({});
        formik.setTouched({});
        formik.setSubmitting(false);
        formik.resetForm();
        nav.navigate('Feed');
      } catch (error) {
        dispatch(toggleIsFetching(false));
      }
    }
  }
}