import './BaseFilter.css';
import React from 'react';
import classNames from 'classnames';
import { FilterCondition, FilterContents } from '../../modules/datalist';

export interface PropValue {
  filterCondition: FilterCondition;
  filterContents: FilterContents;
}

export interface PropActions {
  setCondition: (condition: Partial<FilterCondition>) => void;
  toggleCheck: (key: keyof FilterCondition, value: string) => void;
}

type Props = PropValue & PropActions;

export default class BaseFilter extends React.Component<Props> {
  private handleChangeCondition = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const name = event.currentTarget.dataset['name'];
    const value = event.currentTarget.dataset['value'];
    if (name != null && value != null) {
      this.props.toggleCheck(name as keyof FilterCondition, value);
    }
  };

  public render(): React.ReactNode {
    const { filterContents, filterCondition } = this.props;
    const { belongStates } = filterContents;
    const stateButtons: JSX.Element[] = [];
    Object.entries(belongStates).forEach(([key, value]) => {
      const label = value.shortName || value.name;
      const style: React.CSSProperties = {};
      if (value.color) {
        style.backgroundColor = value.color;
      }
      const checked = filterCondition.belongStates.includes(key);
      stateButtons.push(
        <button
          key={key}
          data-name="belongStates"
          data-value={key}
          style={style}
          className={classNames([
            'button',
            'filter-item',
            'square',
            'state',
            { checked },
          ])}
          onClick={this.handleChangeCondition}
        >
          {label}
        </button>
      );
    });
    return (
      <div>
        <section className="filter-section">
          <h2 className="title">勢力</h2>
          <div className="button-list">{stateButtons}</div>
        </section>
      </div>
    );
  }
}
