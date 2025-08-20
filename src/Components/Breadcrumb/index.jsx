import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import "./style.scss"

const Breadcrumbs = ({ separator = '/' }) => {
    const location = useLocation();
    const locationName = location.pathname.split('/').filter(i => i);

    const breadcrumbItems = locationName.map((_, index) => {
        const url = `/${locationName.slice(0, index + 1).join('/')}`;
        const name = locationName[index]
            .replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());

        return {
            title: <Link to={url}>{name}</Link>,
        };
    });

    return (
        <div className='my-3 '>
            <Breadcrumb className='!text-[12px]' separator={separator} items={breadcrumbItems} />
        </div>
    );
};

export default Breadcrumbs;
