import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { windowActions } from '../modules/window';
import { State } from '../store';
import CardFilter from '../components/CardFilter';

interface Props {
  open: boolean;
  handleOnClose(): void;
}

export class CardFilterContainer extends React.Component<Props> {
  public render(): React.ReactNode {
    const { open } = this.props;
    return <CardFilter open={open} onClose={this.props.handleOnClose} />;
  }
}

export default connect(
  ({ windowReducer: { openedAnyModal: open } }: State) => ({ open }),
  (dispatch: Dispatch) => ({
    handleOnClose: () => dispatch(windowActions.closeFilter()),
  })
)(CardFilterContainer);
