import React from 'react';
import classname from 'classnames';
import styles from './Options.modules.sass'
import _ from 'lodash';
import {Formik, FieldArray} from 'formik';
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
    modifiers: yup.array().of(
        yup.string().required('A valid option must have atleast one modifier')
    )
})
export default function AddOption(props){
    const handleSubmit = e => {
        e.preventDefault();
    } 
    return (
        <div className={classname(styles.main)}>
            <div>
                <form>

                </form>
            </div>
        </div>
    )
}