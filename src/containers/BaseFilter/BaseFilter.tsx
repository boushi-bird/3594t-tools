import './BaseFilter.css';
import React from 'react';
import { DatalistState, FilterCondition } from '../../modules/datalist';
import FilterButtonList from '../../components/FilterButtonList';

export interface StateFromProps {
  filterCondition: FilterCondition;
  filterContents: DatalistState['filterContents'];
}

export interface DispatchFromProps {
  setCondition: (condition: Partial<FilterCondition>) => void;
  toggleCheck: (key: keyof FilterCondition, value: string) => void;
}

type Props = StateFromProps & DispatchFromProps;

export default class BaseFilter extends React.Component<Props> {
  public render(): React.ReactNode {
    const { filterContents, filterCondition, toggleCheck } = this.props;
    return (
      <div>
        <section className="filter-section">
          <h2 className="title">勢力</h2>
          <FilterButtonList
            itemName="belongStates"
            items={filterContents.belongStates}
            checkedItems={filterCondition.belongStates}
            onClickItem={toggleCheck}
            square={true}
          />
        </section>
        <section className="filter-section">
          <h2 className="title">コスト</h2>
          <FilterButtonList
            itemName="costs"
            items={filterContents.costs}
            checkedItems={filterCondition.costs}
            onClickItem={toggleCheck}
            square={true}
          />
        </section>
        <section className="filter-section">
          <h2 className="title">兵種</h2>
          <FilterButtonList
            itemName="unitTypes"
            items={filterContents.unitTypes}
            checkedItems={filterCondition.unitTypes}
            onClickItem={toggleCheck}
            square={true}
          />
        </section>
      </div>
    );
  }
}
