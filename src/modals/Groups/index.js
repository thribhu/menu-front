import React from 'react';
import classname from 'classnames'
import _ from 'lodash'
import styles from './Groups.module.sass'
import Groups from 'views/Groups/groups.json'
import {normalizeText as normalize} from 'utils/normalize';
export default function GroupModal(props){
    const {group} = props;
    let selectedGroup = _.filter(Groups, {name: group})[0]
    const {
        name, 
        description,
        options,
        max_allowed, 
        min_required,
        price_default,
        display_order
    } = selectedGroup;
    return (
        <div className={classname(styles.modal_main)}>
            <div className={classname(styles.modal_header)} />
            <div className={classname(styles.modal_body)}>
                <div className={classname(styles.modal_title)}>
                    {/* name attribute here */}
                    <div className={classname(styles.padding_5px)}>
                    <h5 style={{fontSize: '1rem'}}>{normalize(name)}</h5>
                    </div>
                </div>
                <div>
                    <div className={classname(styles.display_container)}>
                        <label className={classname(styles.modal_label)}>Max allowed</label>
                        <p>{max_allowed}</p>
                    </div>
                    <div className={classname(styles.display_container)}>
                        <label className={classname(styles.modal_label)}>Min required</label>
                        <p>{min_required}</p>
                    </div>
                </div>
                <div>
                    <div className={classname(styles.display_container)}>
                        <label className={classname(styles.modal_label)}>Price default</label>
                        ${parseFloat(price_default)}
                    </div>
                    <div className={classname(styles.display_container)}>
                        <label className={classname(styles.modal_label)}>Dispaly order</label>
                        <p>{display_order}</p>
                    </div>
                </div>
                <div>
                    <p>Options</p>
                    <ul>
                        {options.map((option, i) => (
                            <li key={i}>
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classname(styles.textArea)}>
                            <div className={classname(styles.row_with_margin, styles.modal_label)}>Description</div>
                            <textarea
                                value={description}
                                disabled
                                style={{width: '100%', height: 'auto', padding: '10px', margin: '0 10px'}}
                            />
                </div>
            </div>
        </div>
    )
}