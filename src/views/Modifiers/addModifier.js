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
const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    options: yup.array().of(yup.object().shape({
        name: yup.string(),
        price: yup.number()
    })).required('Options are required').min(1, 'Enter atleast 2 option')
}) 
export default function AddModifier(props) {
    const baseUrl = 'http://127.0.0.1:8000/api/modifiers/' 
    const [modifier, setModifier] = React.useState()
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    React.useEffect(() => {
    if(!_.isEmpty(props.location) && !_.isEmpty(props.location.state)) {
        setModifier(_.get(props, 'location.state'))
    }
    }, [modifier])
    return (
        <div className={classname(styles.container)}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "1.5rem", color: "red" }}>{modifier ? "Update Modifier" : "Add Modifier"}</p>
            </div>
            <Formik
                initialValues={modifier ? _.merge(initialValues, modifier) : initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    let promise
                    if(modifier) {
                        promise = axios.put(baseUrl+modifier.id+"/", values)
                    }
                    else {
                        promise = axios.post(baseUrl, values);
                    }
                    promise.then(res => {
                        if(res.status === 200) {
                            alert('Modifier added successfully')
                        }
                        else if (res.status === 202){
                            alert('Modifier updated successfully')
                        }
                    }).catch(err => {
                        alert('Unable to add modifier. Please try again')
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
                                <ErrorMessage name="options" style={{color:'red'}}/>
                        </div>
                        <div className={classname(styles.saveButtonContainer)}>
                            <button type="submit" className={classname(styles.ctaButton)}>{modifier ? "Save Modifier" : "Add Modifier"}</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
