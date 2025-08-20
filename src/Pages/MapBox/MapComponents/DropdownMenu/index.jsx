import React from 'react';
import { Dropdown } from 'antd';
import { Dots } from '../../../../Config';

const DropdownMenu = ({ items = [], onSelect }) => {
    const menu = {
        items: items.map((item) => ({
            key: item.value,
            label: item.label,
        })),
        onClick: ({ key }) => onSelect?.(key),
    };

    return (
        <Dropdown menu={menu} trigger={['click']} placement="bottomLeft">
            <div className="cursor-pointer">
                <Dots />
            </div>
        </Dropdown>
    );
};

export default DropdownMenu;
