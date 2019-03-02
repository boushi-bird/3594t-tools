import { ActionType, createAction } from 'typesafe-actions';

export const filterTabNames = {
  BASIC: '基本',
  DETAIL: '詳細',
};

export type FilterTab = keyof typeof filterTabNames;

export interface WindowState {
  openedFilter: boolean;
  openedAnyModal: boolean;
  activeFilter: FilterTab;
}

export const windowActions = {
  openFilter: createAction('CHANGE_FILTER_VISIBLE', action => () =>
    action({ openedFilter: true })
  ),
  closeFilter: createAction('CHANGE_FILTER_VISIBLE', action => () =>
    action({ openedFilter: false })
  ),
  closeAllModal: createAction('CLOSE_ALL_MODAL'),
  changeActiveFilterTab: createAction(
    'CHANGE_ACTIVE_FILTER',
    action => (activeFilter: FilterTab) => action({ activeFilter })
  ),
};

const initialState: WindowState = {
  openedFilter: false,
  openedAnyModal: false,
  activeFilter: 'BASIC',
};

export default function windowReducer(
  state: WindowState = initialState,
  actions: ActionType<typeof windowActions>
): WindowState {
  switch (actions.type) {
    case 'CHANGE_FILTER_VISIBLE':
      const {
        payload: { openedFilter },
      } = actions;
      const openedAnyModal = openedFilter;
      return {
        ...state,
        openedFilter,
        openedAnyModal,
      };
    case 'CLOSE_ALL_MODAL':
      return {
        ...state,
        openedFilter: false,
        openedAnyModal: false,
      };
    case 'CHANGE_ACTIVE_FILTER':
      const {
        payload: { activeFilter },
      } = actions;
      return {
        ...state,
        activeFilter,
      };
    default:
      return state;
  }
}
