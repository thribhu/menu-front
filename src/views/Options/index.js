import React from 'react'
import classname from 'classnames';
import styles from './Options.module.sass'
import isValid from 'utils/isValidImage';
import {useHistory} from 'react-router-dom'
export default function Options (){
    const history = useHistory()
    return (
        <div>
            <div className={classname(styles.home_top_bar)}>
                <button onClick={() => history.push('/addOption')} className={classname(styles.home_button)}>
                    Add Option
                </button>
            </div>
        </div>
    )
}