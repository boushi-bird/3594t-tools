import './App.css';
import React from 'react';
import classNames from 'classnames';
import CardList from './CardList';
import CardFilter from './CardFilter';
import { State } from '../module';
import { ActionDispatcher } from '../container';

type Props = {
  value: State;
  actions: ActionDispatcher;
};

export default class App extends React.Component<Props, {}> {
  render() {
    const modal = this.props.value.openFilter;
    const containerClasses = classNames(['app-container', { modal }]);
    return (
      <div className={containerClasses}>
        <div className="app-main">
          <CardList />
          <CardFilter />
        </div>
        <div className="modal-background" />
      </div>
    );
  }
}
