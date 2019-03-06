import './SimpleFilter.css';
import React from 'react';
import { FilterCondition, FilterItem } from '../../modules/datalist';
import FilterButtonList from '../../components/FilterButtonList';

export interface PropValue {
  filterCondition: string[];
  filterContents: FilterItem[];
}

export interface PropActions {
  toggleCheck: (key: keyof FilterCondition, value: string) => void;
}

type Props = PropValue & PropActions;

export default class SimpleFilter extends React.Component<Props> {
  public render(): React.ReactNode {
    const { filterContents, filterCondition, toggleCheck } = this.props;
    return (
      <section className="simple-filter-section">
        <div className="simple-filter-state">
          <h2 className="title-inline">勢力</h2>
          <FilterButtonList
            itemName="belongStates"
            items={filterContents}
            checkedItems={filterCondition}
            onClickItem={toggleCheck}
            square={true}
          />
        </div>
      </section>
    );
  }
}
