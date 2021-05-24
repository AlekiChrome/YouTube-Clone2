import React from 'react';
import './SideLayout.css';


const SideLayout = ({selected, Icon, title}) => {
    return (
        <div className={`side-layout ${selected ? 'selected': ''}`}>
            <Icon className='side-icon'/>
            <h2 className='side-title'>{title}</h2>
        </div>
    )
}

export default SideLayout;