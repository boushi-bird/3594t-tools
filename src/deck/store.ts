import { createStore, combineReducers } from 'redux';
import windowReducer, { WindowState } from './modules/window';

const reducers = { windowReducer };

export default createStore(combineReducers(reducers));

export interface Reducers {
  windowReducer: WindowState;
}
