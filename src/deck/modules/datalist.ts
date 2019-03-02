import { ActionType, createAction } from 'typesafe-actions';

interface SearchCondition {
  state: number[];
}

export interface DatalistState {
  searchCondition: SearchCondition;
}

export const datalistActions = {
  resetConditions: createAction('RESET_CONDITIONS'),
};

const initialState: DatalistState = {
  searchCondition: {
    state: [],
  },
};

export default function datalistReducer(
  state: DatalistState = initialState,
  actions: ActionType<typeof datalistActions>
): DatalistState {
  switch (actions.type) {
    case 'RESET_CONDITIONS':
      return state;
    default:
      return state;
  }
}
