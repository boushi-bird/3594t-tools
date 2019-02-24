import './CardFilter.css';
import React from 'react';
import classNames from 'classnames';

const tabs = {
  BASIC: '基本',
  DETAIL: '詳細',
};

type FilterTab = keyof typeof tabs;

interface Props {
  open: boolean;
  onClose: () => void;
}

interface State {
  activeTab: FilterTab;
}

export default class CardFilter extends React.Component<Props, State> {
  public state: State = {
    activeTab: 'BASIC',
  };

  private handleTabClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const activeTab = event.currentTarget.dataset['tab'] as FilterTab;
    if (this.state.activeTab !== activeTab) {
      this.setState({ activeTab });
    }
  };

  private handleOkClick = (): void => {
    this.props.onClose();
  };

  private renderTabs(): React.FC {
    const buttons: JSX.Element[] = [];
    Object.entries(tabs).forEach(([key, value]) => {
      const active = this.state.activeTab === key;
      const buttonClass = `tab-button-${key.toLowerCase()}`;
      const buttonClasses = classNames([buttonClass, { active }]);
      buttons.push(
        <button
          key={key}
          data-tab={key}
          className={buttonClasses}
          onClick={this.handleTabClick}
        >
          {value}
        </button>
      );
    });
    return () => <div className="card-filter-tabs">{buttons}</div>;
  }

  public render(): JSX.Element {
    const { open } = this.props;
    const containerClasses = classNames(['card-filter-container', { open }]);
    const Tabs = this.renderTabs();
    return (
      <div className={containerClasses}>
        <h1 className="card-filter-title">絞り込みメニュー</h1>
        <div className="card-filter-buttons">
          <Tabs />
          <div className="card-filter-actions">
            <button className="action-buton-reset">リセット</button>
            <button className="action-buton-ok" onClick={this.handleOkClick}>
              OK
            </button>
          </div>
        </div>
      </div>
    );
  }
}
