import './App.css';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import classNames from 'classnames';
import { windowActions, WindowState } from '../modules/window';
import loadBaseData from '../load-base-data';
import { State } from '../store';
import CardList from '../components/CardList';
import CardFilterContainer from './CardFilterContainer';

interface Props {
  openFilter(): void;
  closeAllModal(): void;
}

class App extends React.Component<Props & WindowState> {
  public async componentDidMount(): Promise<void> {
    const baseData = await loadBaseData();
    // TODO 読み込んだデータを使う
    console.log(baseData);
  }

  public render(): React.ReactNode {
    const modal = this.props.openedAnyModal;
    const containerClasses = classNames(['app-container', { modal }]);
    return (
      <div className={containerClasses}>
        <div className="app-main">
          <CardList onClick={this.props.openFilter} />
          <CardFilterContainer />
        </div>
        <div className="modal-background" onClick={this.props.closeAllModal} />
      </div>
    );
  }
}

export default connect(
  (state: State) => ({ ...state.windowReducer }),
  (dispatch: Dispatch) => ({
    ...bindActionCreators(windowActions, dispatch),
  })
)(App);
