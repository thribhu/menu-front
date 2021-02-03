import React from 'react';
import classname from 'classnames'
import styles from './Items.module.sass';
import {useHistory} from 'react-router-dom'
export default function Items (){
    const history = useHistory()
    return (
        <div>
            <div className={classname(styles.home_top_bar)}>
                <button onClick={() => history.push('/addItem')} className={classname(styles.home_button)}>
                    Add Item
                </button>
            </div>
        </div>
    )
}