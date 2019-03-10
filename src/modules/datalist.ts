import { ActionType, createAction } from 'typesafe-actions';
import { BaseData, FilterItem, FilterContents } from '../services/map-basedata';

export type FilterItem = FilterItem;

export interface FilterCondition {
  belongStates: string[];
  costs: string[];
  unitTypes: string[];
  skills: string[];
  skillsAnd: boolean;
  genMains: string[];
  genMainsAnd: boolean;
  rarities: string[];
  generalTypes: string[];
  varTypes: string[];
  majorVersions: string[];
  pockets: string[];
  searchText: string;
}

const initialFilterCondition: FilterCondition = {
  belongStates: [],
  costs: [],
  unitTypes: [],
  skills: [],
  skillsAnd: false,
  genMains: [],
  genMainsAnd: false,
  rarities: [],
  generalTypes: [],
  varTypes: [],
  majorVersions: [],
  pockets: [],
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
  toggleCheckList: createAction(
    'TOGGLE_CHECK_LIST',
    action => (key: keyof FilterCondition, value: string) =>
      action({ key, value })
  ),
  toggleCheck: createAction(
    'TOGGLE_CHECK',
    action => (key: keyof FilterCondition, value: boolean) =>
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
    case 'RESET_CONDITIONS': {
      return {
        ...state,
        filterCondition: initialFilterCondition,
      };
    }
    case 'SET_CONDITION': {
      return {
        ...state,
        filterCondition: {
          ...state.filterCondition,
          ...actions.payload.condition,
        },
      };
    }
    case 'TOGGLE_CHECK_LIST': {
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
    }
    case 'TOGGLE_CHECK': {
      const { key, value } = actions.payload;
      const targetCondition = state.filterCondition[key];
      if (!(targetCondition instanceof Boolean)) {
        console.warn(`${key} is not boolean.`);
        return state;
      }
      return {
        ...state,
        [key]: !value,
      };
    }
    case 'SET_BASE_DATA': {
      const baseData = actions.payload.baseData;
      const { generals, filterContents } = baseData;
      return {
        ...state,
        filterCondition: initialFilterCondition,
        filterContents,
        generals,
      };
    }
    default:
      return state;
  }
}
