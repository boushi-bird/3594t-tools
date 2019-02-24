import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { windowActions } from '../modules/window';
import { State } from '../store';
import CardFilter from '../components/CardFilter';

interface Props {
  openedAnyModal: boolean;
  closeFilter(): void;
}

export class CardFilterContainer extends React.Component<Props> {
  public render(): JSX.Element {
    const open = this.props.openedAnyModal;
    return <CardFilter open={open} onClose={this.props.closeFilter} />;
  }
}

export default connect(
  ({ windowReducer: { openedAnyModal } }: State) => ({ openedAnyModal }),
  (dispatch: Dispatch) => ({
    closeFilter: () => dispatch(windowActions.closeFilter()),
  })
)(CardFilterContainer);
