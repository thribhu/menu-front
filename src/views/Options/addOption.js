import React from 'react';
import classname from 'classnames';
import styles from './Options.module.sass'
import _ from 'lodash';
import {Formik, FieldArray, Form} from 'formik';
import * as yup from 'yup';
const initValues = {
    name: '',
    description: '',
    image_url: '',
    price: '',
    type: '',
    modifiers: []
}
const validationSchema = yup.object({
    name: yup.string().required('A valid option must have name'),
    description: yup.string().optional(),
    image_url: yup.string().optional(),
    price: yup.number().required('A valid option must have price'),
    type: yup.string().optional(),
})
export default function AddOption(props){
    const handleSubmit = e => {
        e.preventDefault();
    } 
    return (
        <div className={classname(styles.main)}>
            <div>
                <Formik
                initialValues={initValues}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
                >
                    {({
                        handleBlur,
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                        touched,
                        dirty,
                        isValid
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div>
                                    <label>
                                        Name
                                    </label>
                                </div>
                                <div>
                                    <input 
                                        value={values.name}
                                        type="text"
                                        onChange={handleChange('name')}
                                        id="name"
                                        name="name"
                                        autoFocus={true}
                                        autoCapitalize="none"
                                    />
                                </div>
                                <div>
                                    {touched.name 
                                        &&
                                     dirty.valueOf('name') 
                                        && 
                                    errors.name
                                        &&
                                    errors.name
                                    }
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}