import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { WindowState, windowActions } from '../../modules/window';
import { datalistActions } from '../../modules/datalist';
import { State } from '../../store';
import App, { Props } from './App';
import loadData from '../../api/load-data';

export default connect(
  (state: State): WindowState => state.windowReducer,
  (dispatch: Dispatch): Props => ({
    resetConditions: bindActionCreators(
      datalistActions.resetConditions,
      dispatch
    ),
    fetchBaseData: async (): Promise<void> => {
      const baseData = await loadData();
      dispatch(datalistActions.setBaseData(baseData));
    },
    ...bindActionCreators(windowActions, dispatch),
  })
)(App);
