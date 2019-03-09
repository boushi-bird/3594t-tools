import { ActionType, createAction } from 'typesafe-actions';
import { BaseData, FilterItem, FilterContents } from '../services/map-basedata';

export type FilterItem = FilterItem;

export interface FilterCondition {
  belongStates: string[];
  costs: string[];
  unitTypes: string[];
  searchText: string;
}

const initialFilterCondition: FilterCondition = {
  belongStates: [],
  costs: [],
  unitTypes: [],
  searchText: '',
};

const initialFilterContents: FilterContents = {
  belongStates: [],
  costs: [],
  unitTypes: [],
  skills: [],
  genMains: [],
  rarities: [],
  generalTypes: [],
  varTypes: [],
  versions: [],
  majorVersions: [],
};

export interface DatalistState {
  filterCondition: FilterCondition;
  filterContents: FilterContents;
  generals: BaseData['generals'];
}

const initialState: DatalistState = {
  filterCondition: initialFilterCondition,
  filterContents: initialFilterContents,
  generals: [],
};

export const datalistActions = {
  resetConditions: createAction('RESET_CONDITIONS'),
  setCondition: createAction(
    'SET_CONDITION',
    action => (condition: Partial<FilterCondition>) => action({ condition })
  ),
  toggleCheck: createAction(
    'TOGGLE_CHECK',
    action => (key: keyof FilterCondition, value: string) =>
      action({ key, value })
  ),
  setBaseData: createAction('SET_BASE_DATA', action => (baseData: BaseData) =>
    action({ baseData })
  ),
};

export default function datalistReducer(
  state: DatalistState = initialState,
  actions: ActionType<typeof datalistActions>
): DatalistState {
  switch (actions.type) {
    case 'RESET_CONDITIONS':
      return {
        ...state,
        filterCondition: initialFilterCondition,
      };
    case 'SET_CONDITION':
      // TODO
      return {
        ...state,
        filterCondition: {
          ...state.filterCondition,
          ...actions.payload.condition,
        },
      };
    case 'TOGGLE_CHECK':
      const { key, value } = actions.payload;
      const targetCondition = state.filterCondition[key];
      if (!(targetCondition instanceof Array)) {
        console.warn(`${key} is not array.`);
        return state;
      }
      if (targetCondition.includes(value)) {
        return {
          ...state,
          filterCondition: {
            ...state.filterCondition,
            [key]: targetCondition.filter(v => v !== value),
          },
        };
      } else {
        return {
          ...state,
          filterCondition: {
            ...state.filterCondition,
            [key]: [...targetCondition, value],
          },
        };
      }
    case 'SET_BASE_DATA':
      const baseData = actions.payload.baseData;
      const { generals, filterContents } = baseData;
      return {
        ...state,
        filterCondition: initialFilterCondition,
        filterContents,
        generals,
      };
    default:
      return state;
  }
}
