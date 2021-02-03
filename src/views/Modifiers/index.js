import React from 'react';
import classname from 'classnames'
import styles from './Modifiers.module.sass';
import {useHistory} from 'react-router-dom'
export default function Modifiers (){
    const history = useHistory()
    return (
        <div>
            <div className={classname(styles.home_top_bar)}>
                <button onClick={() => history.push('/addModifier')} className={classname(styles.home_button)}>
                    Add Modifier
                </button>
            </div>
        </div>
    )
}
