import { connect } from 'react-redux';
import { State } from '../../store';
import CardList, { StateFromProps, DispatchFromProps } from './CardList';

export default connect<StateFromProps, DispatchFromProps>(
  (state: State) => {
    const {
      generals: all,
      filterCondition: { belongStates, costs, unitTypes },
    } = state.datalistReducer;
    const generals = all.filter(general => {
      if (
        belongStates.length > 0 &&
        !belongStates.includes(general.raw.state)
      ) {
        return false;
      }
      if (costs.length > 0 && !costs.includes(general.raw.cost)) {
        return false;
      }
      if (unitTypes.length > 0 && !unitTypes.includes(general.raw.unit_type)) {
        return false;
      }
      return true;
    });
    return {
      generals,
    };
  },
  () => ({})
)(CardList);
