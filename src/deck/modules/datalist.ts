import { ActionType, createAction } from 'typesafe-actions';
import { BaseData } from '../load-base-data';

interface FilterItem {
  code: string;
  name: string;
  shortName?: string;
  color?: string;
}

interface FilterItems {
  [key: string]: FilterItem;
}

export interface FilterContents {
  belongStates: FilterItems;
}

interface ArrayFilterCondition {
  belongStates: string[];
}

interface SimpleFilterCondition {
  searchText: string;
}

export type FilterCondition = SimpleFilterCondition & ArrayFilterCondition;

export interface DatalistState {
  filterCondition: FilterCondition;
  filterContents: FilterContents;
}

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

const initialFilterCondition = {
  belongStates: [],
  searchText: '',
};

const initialState: DatalistState = {
  filterCondition: initialFilterCondition,
  filterContents: {
    belongStates: {},
  },
};

const arrayToObject = <T, V>(
  array: T[],
  func: (t: T) => V
): { [key: string]: V } =>
  Object.assign({}, ...array.map((v, i) => ({ [`${i}`]: func(v) })));

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
      // TODO
      console.log(baseData);
      const filterContents: FilterContents = {
        belongStates: arrayToObject(baseData.STATE, s => ({
          code: s.code,
          name: s.name,
          shortName: s['name_short'],
          color: `rgb(${s.red}, ${s.green}, ${s.blue})`,
        })),
      };
      return {
        ...state,
        filterCondition: initialFilterCondition,
        filterContents,
      };
    default:
      return state;
  }
}
