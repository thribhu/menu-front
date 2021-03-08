import React from 'react';
import classname from 'classnames'
import styles from './Modifiers.module.sass';
import { Formik, ErrorMessage, Field, Form, FieldArray } from 'formik';
import * as yup from 'yup';
import {FaPlusSquare, FaMinusSquare} from 'react-icons/fa'
import _ from 'lodash';
import axios from 'axios'
const initialValues = {
    name: '',
    options: [
        {
            name: '',
            price: '',
        },
    ],
};
const validationSchema = yup.object({
    name: yup.string().required('Name is required')
}) 
export default function AddModifier(props) {
    return (
        <div className={classname(styles.container)}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "1.5rem", color: "red" }}>Add Modifier</p>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    let promise = axios.post('http://127.0.0.1:8000/api/modifiers/', values)
                    promise.then(res => {
                        alert('Modifier added succesfully')
                    }).catch(err => {
                        console.log(err)
                    })
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
                                        type="text"
                                        className={classname(styles.formInput)}
                                    />
                                <ErrorMessage
                                    name={"name"}
                                    component="div"
                                    className="field-error"
                                    style={{color: 'red'}}
                                />
                                </div>
                            </div>
                            <div>
                                <div className={classname(styles.titleWithNoBox)}>
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
                                                                <div style={{padding:'10px'}}>
                                                                    <button
                                                                        type="button"
                                                                        className="secondary"
                                                                        onClick={() => remove(index)}
                                                                        className={classname(styles.common_button)}
                                                                    >
                                                                        <FaMinusSquare style={{fontSize: '24px'}}/>
                                                                    </button>
                                                                </div>
                                                            }
                                                            {
                                                                index !== 0 ? null :
                                                                    <div style={{padding: '10px'}}>
                                                                        <button
                                                                            type="button"
                                                                            className="secondary"
                                                                            onClick={() => insert(0, { name: '', price: '' })}
                                                                            className={classname(styles.common_button)}
                                                                        >
                                                                        <FaPlusSquare style={{fontSize: '24px'}}/>
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
