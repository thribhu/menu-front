import React from 'react';
import './Sidebar.module.sass';
import classname from 'classnames';
import default_img from './default.jpg';
import normalize from 'utils/normalize'
export default function Sidebar(props){
    const {
        child,
        title,
        img
    } = props;
    return (
        <div className={classname("main")}>
            <div className={classname("sidebar")}>
                <div class={classname("titlebox")}>
                    <img src={img ? img : default_img} className={classname("avatar")}/>
                </div>
                <div className={classname("title")}>
                    <h1>{title ? normalize(title) : normalize('echola pizza')}</h1>
                </div>
            </div>
            <div className={classname("sidebar-content")}>
                {child}
            </div> 
        </div>
    ) 
}