import './App.css';
import React from 'react';
import classNames from 'classnames';
import ComponentBase from './ComponentBase';
import CardList from './CardList';
import CardFilter from './CardFilter';
import { State } from '../module';
import { ActionDispatcher } from '../container';

interface Props {
  value: State;
  actions: ActionDispatcher;
}

export default class App extends ComponentBase<Props, {}> {
  private handleButtonClick = () => {
    if (this.props.value.openFilter) {
      this.props.actions.close();
    } else {
      this.props.actions.open();
    }
  };

  public render(): JSX.Element {
    const modal = this.props.value.openFilter;
    const containerClasses = classNames(['app-container', { modal }]);
    return (
      <div className={containerClasses}>
        <div className="app-main">
          <CardList onClick={this.handleButtonClick} />
          <CardFilter open={modal} />
        </div>
        <div className="modal-background" />
      </div>
    );
  }
}
