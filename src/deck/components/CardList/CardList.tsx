import './CardList.css';
import React from 'react';
import ComponentBase from '../ComponentBase';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default class CardList extends ComponentBase<Props> {
  public render(): JSX.Element {
    return (
      <div className="card-list-container">
        card-list-container
        <button onClick={this.props.onClick}>a</button>
      </div>
    );
  }
}
