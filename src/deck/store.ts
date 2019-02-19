import { createStore, combineReducers, Action } from 'redux';
import reducer, { State, Actions } from './module';

export default createStore(combineReducers({ reducer }));

export type ReduxState = {
  reducer: State;
};

export type ReduxAction = Actions | Action;
