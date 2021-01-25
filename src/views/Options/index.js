import React from 'react'
import classnames from 'classnames';
import styles from './Options.module.sass'
import isValid from 'utils/isValidImage';
const options = require('./options.json');
export default function Options(props) {
    const { name, description, image_url, price, type, modifiers } = options;
    return (
        <div className="main">
            <div className="card">
                <div className={classnames(styles.cardHeader)}>
                    <div className={classname(styles.avatar)}>
                        <img src={isValid(image_url) ? image_url : '/mozzarella.jpg'} className={classname(styles.avatar_img)} />
                    </div>
                    <h4>{name}</h4>
                </div>
                <div className={classnames(styles.cardBody)}>
                    <div className={classname(styles.cardContent)}>
                        <p>
                            <span className={classname(styles.isLable)}>
                                Price:
                            </span>
                            {price}
                        </p>
                    </div>
                    <div className={classname(styles.cardContent)}>
                        <p>
                            <span className={classname(styles.isLable)}>
                                Type:
                            </span>
                            {type}
                        </p>
                    </div>
                    <div className={classname(styles.cardContent)}>
                        <p>
                            <span className={classname(styles.isLable)}>
                                Modifiers:
                            </span>
                        </p>
                        <div className={classname(styles.isFlexContent)}>
                            {modifiers.length ?
                                <ShowModifiers data={modifiers} />
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}