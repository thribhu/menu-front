import React from 'react';
import styles from './Pizza.module.sass'
import classname from 'classnames';
export default function Pizza(props){
    const {child} = props;
    return (
        <div className={classname(styles.pizza)}>
            <div className={classname(styles.topBar)}>
                <div className={classname("navlinks")}>

                </div>
            </div>
            <div className="base">
                {child}
            </div>
        </div>
    )
}