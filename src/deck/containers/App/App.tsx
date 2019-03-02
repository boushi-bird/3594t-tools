import './App.css';
import React from 'react';
import classNames from 'classnames';
import loadBaseData from '../../load-base-data';
import { WindowState, filterTabNames, FilterTab } from '../../modules/window';
import CardList from '../../components/CardList';
import FilterTabs from '../../components/FilterTabs/FilterTabs';

export interface Props {
  resetConditions(): void;
  openFilter(): void;
  closeFilter(): void;
  closeAllModal(): void;
  changeActiveFilterTab(activeFilter: FilterTab): void;
}

export default class App extends React.PureComponent<Props & WindowState> {
  public async componentDidMount(): Promise<void> {
    // TODO moduleから呼ぶ
    const baseData = await loadBaseData();
    // TODO 読み込んだデータを使う
    console.log(baseData);
  }

  public render(): React.ReactNode {
    const {
      resetConditions,
      openFilter,
      closeFilter,
      closeAllModal,
      changeActiveFilterTab,
      openedFilter: open,
      openedAnyModal: modal,
      activeFilter,
    } = this.props;
    const containerClasses = classNames(['app-container', { modal }]);
    const cardFilterClasses = classNames(['card-filter-container', { open }]);
    return (
      <div className={containerClasses}>
        <div className="app-main">
          <CardList onClick={openFilter} />
          <div className={cardFilterClasses}>
            <h1 className="card-filter-title">絞り込みメニュー</h1>
            <div className="card-filter-buttons">
              <FilterTabs
                tabs={filterTabNames}
                activeTab={activeFilter}
                onTabChanged={changeActiveFilterTab}
              />
              <div className="card-filter-actions">
                <button
                  className="action-buton-reset"
                  onClick={resetConditions}
                >
                  リセット
                </button>
                <button className="action-buton-ok" onClick={closeFilter}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-background" onClick={closeAllModal} />
      </div>
    );
  }
}
