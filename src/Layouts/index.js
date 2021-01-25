import React from 'react';
import classname from 'classnames';
import './Layout/module.sass';
import Sidebar from 'components/Sidebar';
import Pizza from 'components/Pizza'
export default function Layout() {
    return (
        <div className={classname("Layout")}>
            <Sidebar />
            <Pizza/>
        </div>
    )
}