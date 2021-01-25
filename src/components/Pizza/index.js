import React from 'react';
import './Pizza.module.sass'
import classname from 'classnames';
export default function Pizza(props){
    const {child} = props;
    return (
        <div className={classname("pizza")}>
            <div className={classname('topbar')}>
                <div className={classname("navlinks")}>

                </div>
            </div>
            <div className="base">
                {child}
            </div>
        </div>
    )
}