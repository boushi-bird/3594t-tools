import './CardFilter.css';
import React from 'react';
import classNames from 'classnames';

export default class CardFilter extends React.Component<{}, {}> {
  render() {
    const open = false;
    const containerClasses = classNames(['card-filter-container', { open }]);
    return <div className={containerClasses}>card-filter-container</div>;
  }
}
