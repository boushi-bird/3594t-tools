import './CardFilter.css';
import React from 'react';
import classNames from 'classnames';

interface Props {
  open: boolean;
}

export default class CardFilter extends React.Component<Props, {}> {
  public render(): JSX.Element {
    const { open } = this.props;
    const containerClasses = classNames(['card-filter-container', { open }]);
    return <div className={containerClasses}>card-filter-container</div>;
  }
}
