import { ActionType, createAction } from 'typesafe-actions';

export interface WindowState {
  openedFilter: boolean;
  openedAnyModal: boolean;
}

const OPEN_FILTER = 'OPEN_FILTER';
const CLOSE_FILTER = 'CLOSE_FILTER';
const CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL';

export const actions = {
  openFilter: createAction(OPEN_FILTER, action => () =>
    action({ openedFilter: true })
  ),
  closeFilter: createAction(CLOSE_FILTER, action => () =>
    action({ openedFilter: false })
  ),
  closeAllModal: createAction(CLOSE_ALL_MODAL),
};

export type WindowActions = ActionType<typeof actions>;

const initialState: WindowState = {
  openedFilter: false,
  openedAnyModal: false,
};

export default function windowReducer(
  state: WindowState = initialState,
  actions: WindowActions
): WindowState {
  let openedFilter: boolean;
  switch (actions.type) {
    case OPEN_FILTER:
    case CLOSE_FILTER:
      openedFilter = actions.payload.openedFilter;
      break;
    case CLOSE_ALL_MODAL:
      openedFilter = false;
      break;
    default:
      return state;
  }
  return {
    openedFilter,
    openedAnyModal: openedFilter,
  };
}
