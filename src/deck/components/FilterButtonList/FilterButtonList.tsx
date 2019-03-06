import './FilterButtonList.css';
import React from 'react';
import classNames from 'classnames';
import { FilterCondition } from '../../modules/datalist';

type FilterConditionKey = keyof FilterCondition;

interface ButtonItem {
  id: string;
  name: string;
  nameShort?: string;
  color?: string;
}

interface Props {
  itemName: FilterConditionKey;
  items: ButtonItem[];
  checkedItems: string[];
  onClickItem: (itemName: FilterConditionKey, itemValue: string) => void;
  square?: boolean;
  addtionalClasses?: string[];
}

const defaultClasses = ['button', 'filter-item'];

export default class BaseFilter extends React.PureComponent<Props> {
  private buttonClasses: string[];
  private square: boolean;
  public constructor(props: Props) {
    super(props);
    this.buttonClasses = props.addtionalClasses
      ? [...defaultClasses, ...props.addtionalClasses]
      : defaultClasses;
    this.square = this.props.square || false;
  }
  private handleClickItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const value = event.currentTarget.value;
    const { itemName, onClickItem } = this.props;
    onClickItem(itemName, value);
  };

  public render(): React.ReactNode {
    const { checkedItems, items } = this.props;
    const square = this.square;
    const buttons: JSX.Element[] = [];
    items.forEach(item => {
      const value = item.id;
      const label = square ? item.nameShort || item.name : item.name;
      const style: React.CSSProperties = {};
      if (item.color) {
        style.backgroundColor = item.color;
      }
      const checked = checkedItems.includes(value);
      buttons.push(
        <button
          key={value}
          value={value}
          style={style}
          className={classNames(this.buttonClasses, { checked, square })}
          onClick={this.handleClickItem}
        >
          {label}
        </button>
      );
    });
    return <div className="button-list">{buttons}</div>;
  }
}
