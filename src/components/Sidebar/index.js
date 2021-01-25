import React from 'react';
import styles from './Sidebar.module.css';
import classname from 'classnames';
import default_img from './default.jpg';
import { normalizeText } from 'utils/normalize'
export default function Sidebar(props) {
    const {
        child,
        title,
        img
    } = props;
    return (
        <div className={classname(styles.main)}>
            <div className={classname(styles.sidebar)}>
                <div class={classname(styles.titleBox)}>
                    <div className={classname(styles.avatar)}>
                        <img src={img ? img : default_img} className={classname(styles.avatarImg)} />
                    </div>
                    <div className={classname(styles.title)}>
                        <h1>{title ? normalizeText(title) : normalizeText('echola pizza')}</h1>
                    </div>
                </div>
            </div>
            <div className={classname(styles.sidebar_content)}>
                {child}
            </div>
        </div>
    )
}