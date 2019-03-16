import { ToggleIsFetching } from './interface';

export const toggleIsFetching = (fetching: boolean): ToggleIsFetching => ({
  type: 'IS_FETCHING',
  fetching,
})