import React from 'react';
import classname from 'classnames'
import styles from './Modifiers.module.sass';
import { Formik, ErrorMessage, Field, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
const initialValues = {
    name: '',
    options: [
        {
            name: '',
            price: '',
        },
    ],
};
export default function AddModifier() {
    return (
        <div className={classname(styles.container)}>
            <div className={classname(styles.formTitle)}>
                Add Modifier
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    if((values.options[0].name || values.options[0].price) === ''){
                        values.options.splice(0,1)
                    }
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ values }) => (
                    <Form>
                        <div>
                            <div className={classname(styles.formControl)}>
                                <div>
                                    <label htmlFor="name" className={classname(styles.formLable)}>Modifier</label>
                                </div>
                                <div>
                                    <Field
                                        name="name"
                                        placeholder="crust"
                                        type="text"
                                        className={classname(styles.formInput)}
                                    />
                                </div>
                                <ErrorMessage
                                    name={"name"}
                                    component="div"
                                    className="field-error"
                                />
                            </div>
                            <div>
                                <div>
                                    <h4>
                                        Options
                                    </h4>
                                </div>
                                <FieldArray name="options">
                                    {({ insert, remove, push, form }) => (
                                        <div>
                                            {values.options.length > 0 &&
                                                values.options.map((option, index) => (
                                                    <div className={classname(styles.horizontalContent)} key={index}>
                                                        <div className={classname(styles.formControl)}>
                                                            <div>
                                                                <label className={classname(styles.formLable)} htmlFor={`options.${index}.name`}>Name</label>
                                                            </div>
                                                            <div>
                                                                <Field
                                                                    name={`options.${index}.name`}
                                                                    type="text"
                                                                    className={classname(styles.formInput)}
                                                                />
                                                            </div>
                                                            <ErrorMessage
                                                                name={`options.${index}.name`}
                                                                component="div"
                                                                className="field-error"
                                                            />
                                                        </div>
                                                        <div className={classname(styles.formControl)}>
                                                            <div>
                                                                <label className={classname(styles.formLable)} htmlFor={`options.${index}.price`}>Price</label>
                                                            </div>
                                                            <div>
                                                                <Field
                                                                    name={`options.${index}.price`}
                                                                    type="number"
                                                                    step="0.01"
                                                                    className={classname(styles.formInput)}
                                                                />
                                                            </div>
                                                            <ErrorMessage
                                                                name={`options.${index}.price`}
                                                                component="div"
                                                                className="field-error"
                                                            />
                                                        </div>
                                                        <div className={classname(styles.button_container)}>
                                                            {index === 0 ? null :
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="secondary"
                                                                        onClick={() => remove(index)}
                                                                        className={classname(styles.common_button)}
                                                                    >
                                                                        <img src="/assets/remove.svg" height="20px" width="20px"/>
                                                                    </button>
                                                                </div>
                                                            }
                                                            {
                                                                index !== 0 ? null :
                                                                    <div className={classname(styles.buttonContainer)}>
                                                                        <button
                                                                            type="button"
                                                                            className="secondary"
                                                                            onClick={() => insert(0, { name: '', price: '' })}
                                                                            className={classname(styles.common_button)}
                                                                        >
                                                                            <img src="/assets/plus.svg" height="20px" width="20px" />
                                                                        </button>
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </FieldArray>
                            </div>
                        </div>
                        <div className={classname(styles.saveButtonContainer)}>
                            <button type="submit" className={classname(styles.ctaButton)}>Save Option</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
