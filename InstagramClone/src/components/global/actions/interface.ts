
export interface ToggleIsFetching {
  type: 'IS_FETCHING';

  fetching: boolean;
}
export type GlobalActionType =
  | ToggleIsFetching;
