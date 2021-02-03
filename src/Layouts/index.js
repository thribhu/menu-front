import React from 'react';
import classname from 'classnames';
import styles from './Layout.module.sass';
import Sidebar from 'components/Sidebar';
import Pizza from 'components/Pizza'
export default function Layout(porps) {
    return (
        <div className={classname(styles.layout)}>
            <Sidebar />
            <Pizza {...porps}/>
        </div>
    )
}