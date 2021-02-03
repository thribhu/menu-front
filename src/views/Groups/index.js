import React from 'react';
import classname from 'classnames'
import styles from './Groups.module.sass';
import {useHistory} from 'react-router-dom'
export default function Items (){
    const history = useHistory()
    return (
        <div>
            <div className={classname(styles.home_top_bar)}>
                <button onClick={() => history.push('/addGroup')} className={classname(styles.home_button)}>
                    Add Group
                </button>
            </div>
        </div>
    )
}