import './CardList.css';
import React from 'react';

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default class CardList extends React.Component<Props> {
  public render(): React.ReactNode {
    return (
      <div className="card-list-container">
        card-list-container
        <button onClick={this.props.onClick}>a</button>
      </div>
    );
  }
}
