import { FunctionComponent, useState } from 'react';
import './menu-list.css';

interface IMenuListItem {
    icon?: any;
    text: string;
}
interface IMenuListProps {
    onSelectionChanged?: (item: IMenuListItem) => {}
    items: IMenuListItem[]
}
export const MenuList: FunctionComponent<IMenuListProps> = ({ onSelectionChanged = () => { }, items = [] }) => {
    const [selectedItem, setSelectedItem] = useState<IMenuListItem>();
    return (
        <div className="menu-list-wrapper">
            {items.map((item, index) => (
                <div key={index} className={`menu-list-item-wrapper ${item === selectedItem ? "menu-list-selected-item" : ''}`} onClick={() => {
                    setSelectedItem(item);
                    onSelectionChanged(item);
                }}>
                    {item.icon}
                    <span className="menu-list-text">{item.text}</span>
                </div>
            ))}
        </div>
    )
}