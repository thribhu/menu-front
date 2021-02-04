import React from 'react';
import classname from 'classnames'
import _ from 'lodash'
import styles from './Groups.module.sass'
import Groups from 'views/Groups/groups.json'
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
    debugger
    return (
        <div className={classname(styles.modal_main)}>
            <div className={classname(styles.modal_header)} />
            <div className={classname(styles.modal_body)}>
                <div className={classname(styles.modla_title)}>
                    {/* name attribute here */}
                    <h5>{name}</h5>
                </div>
                <div>
                    <div>
                        <label>Max allowed</label>
                        <p>{max_allowed}</p>
                    </div>
                    <div>
                        <label>Min required</label>
                        <p>{min_required}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Price default</label>
                        <p>{price_default}</p>
                    </div>
                    <div>
                        <label>Dispaly order</label>
                        <p>{display_order}</p>
                    </div>
                </div>
                <div>
                    <p>Options</p>
                    <ul>
                        {options.map((option, i) => (
                            <li key={i}>
                                {option.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classname(styles.textArea)}>
                            <div>Description</div>
                            <p>{description}</p>
                </div>
            </div>
        </div>
    )
}