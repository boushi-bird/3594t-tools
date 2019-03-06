import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { datalistActions } from '../../modules/datalist';
import { State } from '../../store';
import BaseFilter, { PropValue, PropActions } from './BaseFilter';

export default connect(
  (state: State): PropValue => state.datalistReducer,
  (dispatch: Dispatch): PropActions =>
    bindActionCreators(
      {
        setCondition: datalistActions.setCondition,
        toggleCheck: datalistActions.toggleCheck,
      },
      dispatch
    )
)(BaseFilter);
