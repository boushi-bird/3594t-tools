import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import classNames from 'classnames';
import { actions, WindowActions, WindowState } from '../modules/window';
import { Reducers } from '../store';
import CardList from '../components/CardList';
import CardFilter from '../components/CardFilter';

interface Props {
  openFilter(): void;
  closeAllModal(): void;
}

class App extends React.Component<Props & WindowState> {
  public render(): JSX.Element {
    const modal = this.props.openedAnyModal;
    const containerClasses = classNames(['app-container', { modal }]);
    return (
      <div className={containerClasses}>
        <div className="app-main">
          <CardList onClick={this.props.openFilter} />
          <CardFilter open={modal} />
        </div>
        <div className="modal-background" onClick={this.props.closeAllModal} />
      </div>
    );
  }
}

export default connect(
  (state: Reducers) => ({ ...state.windowReducer }),
  (dispatch: Dispatch<WindowActions>) => ({
    ...bindActionCreators(actions, dispatch),
  })
)(App);
