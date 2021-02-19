import React from 'react';
import classname from 'classnames'
import _ from 'lodash'
import styles from './Options.module.sass'
import Options from 'views/Options/options.json'
import { normalizeText as normalize, normalizeText } from 'utils/normalize';
export default function OptionModal(props) {
    const { option } = props;
    let selectedOption = _.filter(Options, { name: option })[0]
    const {
        name,
        description,
        modifiers,
        image_url,
        price,
        type
    } = selectedOption;
    return (
        <div className={classname(styles.modal_main)}>
            <div className={classname(styles.modal_header)} />
            <div className={classname(styles.modal_body)}>
                <div className={classname(styles.modal_title)}>
                    {/* name attribute here */}
                <div>
                    <img src={'/mozzarella.jpg'} className={classname(styles.avatar)}/>
                </div>
                    <div className={classname(styles.padding_5px)}>
                        <h5 style={{ fontSize: '1rem' }}>{normalize(name)}</h5>
                    </div>
                </div>
                <div>
                    <div className={classname(styles.display_container)}>
                        <label className={classname(styles.modal_label)}>Price</label>
                        <p>${parseFloat(price)}</p>
                    </div>
                    <div className={classname(styles.display_container)}>
                        <label className={classname(styles.modal_label)}>Type</label>
                        <p>{normalize(type)}</p>
                    </div>
                </div>
                <div>
                    <p className={classname(styles.modal_label)}>Modifiers</p>
                    <ul>
                        {modifiers.map((m, i) => (
                            <li key={i}>
                                {m}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={classname(styles.text_area)}>
                    <div className={classname(styles.row_with_margin, styles.modal_label)}>Description</div>
                    <textarea
                        value={description}
                        disabled
                        style={{ width: '100%', height: 'auto', padding: '10px', margin: '0 10px' }}
                    />
                </div>
            </div>
        </div>
    )
}