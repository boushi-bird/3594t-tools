import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { windowActions } from '../../modules/window';
import { datalistActions } from '../../modules/datalist';
import { State } from '../../store';
import App, { StateFromProps, DispatchFromProps } from './App';
import loadData from '../../api/load-data';

export default connect<StateFromProps, DispatchFromProps>(
  (state: State) => ({
    ...state.windowReducer,
    openedAnyModal: state.windowReducer.openedFilter,
  }),
  (dispatch: Dispatch) => ({
    fetchBaseData: async (): Promise<void> => {
      const baseData = await loadData();
      dispatch(datalistActions.setBaseData(baseData));
    },
    ...bindActionCreators(
      {
        resetConditions: datalistActions.resetConditions,
        ...windowActions,
      },
      dispatch
    ),
  })
)(App);
