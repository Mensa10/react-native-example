import { FeedContent } from "../../../helpers/types";

export interface FetchFeedAction {
  type: 'FETCH_ALL_FEED',
  allFeed: FeedContent[] | null,
}

export type FeedActionType =
  FetchFeedAction;