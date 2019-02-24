import { createStore, combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import windowReducer from './modules/window';

const reducers = { windowReducer };

export type State = StateType<typeof reducers>;

export default createStore(combineReducers<State>(reducers));
