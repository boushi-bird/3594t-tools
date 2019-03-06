import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { datalistActions } from '../../modules/datalist';
import { State } from '../../store';
import SimpleFilter, { PropValue, PropActions } from './SimpleFilter';

export default connect(
  (state: State): PropValue => ({
    filterCondition: state.datalistReducer.filterCondition.belongStates,
    filterContents: state.datalistReducer.filterContents.belongStates,
  }),
  (dispatch: Dispatch): PropActions =>
    bindActionCreators(
      {
        toggleCheck: datalistActions.toggleCheck,
      },
      dispatch
    )
)(SimpleFilter);
