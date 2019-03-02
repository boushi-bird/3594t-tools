import './CardFilter.css';
import React from 'react';
import classNames from 'classnames';
import FilterTabs from './FilterTabs';

const tabs = {
  BASIC: '基本',
  DETAIL: '詳細',
};

export type TabType = keyof typeof tabs;

interface Props {
  open: boolean;
  onClose: () => void;
}

interface LocalState {
  activeTab: TabType;
}

export default class CardFilter extends React.PureComponent<Props, LocalState> {
  public state: LocalState = {
    activeTab: 'BASIC',
  };

  private handleTabChange = (activeTab: TabType): void => {
    this.setState({ activeTab });
  };

  public render(): React.ReactNode {
    const { open, onClose } = this.props;
    const containerClasses = classNames(['card-filter-container', { open }]);
    return (
      <div className={containerClasses}>
        <h1 className="card-filter-title">絞り込みメニュー</h1>
        <div className="card-filter-buttons">
          <FilterTabs
            tabs={tabs}
            activeTab={this.state.activeTab}
            onTabChanged={this.handleTabChange}
          />
          <div className="card-filter-actions">
            <button className="action-buton-reset">リセット</button>
            <button className="action-buton-ok" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}
