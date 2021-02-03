import React from 'react';
import classname from 'classnames';
import styles from './Options.module.sass'
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import modifiers from '../Modifiers/modifiers.json'
import {normalizeText as normalize} from 'utils/normalize'
const initialValues = {
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
export default function AddOption(props) {
    const handleSubmit = e => {
        e.preventDefault();
    }
    return (
        <div className={classname(styles.container)}>
            <div className={classname(styles.formTitle)}>
                <h4>
                Add Option
                </h4>
            </div>
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ values }) => (
                <Form>
                    <div>
                        <div className={classname(styles.formControl)}>
                            <div className={classname(styles.labelContainer)}>
                                <label htmlFor="name" className={classname(styles.formLabel, styles.labelContainer)}>Option</label>
                            </div>
                            <div>
                                <Field
                                    name="name"
                                    type="text"
                                    className={classname(styles.formInput)}
                                    autoFocus={true}
                                />
                            </div>
                            <ErrorMessage
                                name={"name"}
                                component="div"
                                className="field-error"
                            />
                        </div>
                        <div className={classname(styles.formControl)}>
                            <div className={classname(styles.labelContainer)}>
                                <label htmlFor="price" className={classname(styles.formLabel, styles.labelContainer)}>Price</label>
                            </div>
                            <div>
                                <Field
                                    name="price"
                                    type="number"
                                    className={classname(styles.formInput)}
                                    min={0}
                                    step={0.01}
                                />
                            </div>
                            <ErrorMessage
                                name={"price"}
                                component="div"
                                className="field-error"
                            />
                        </div>
                        <div className={classname(styles.formControl)}>
                            <div className={classname(styles.labelContainer)}>
                                <label htmlFor="type" className={classname(styles.formLabel, styles.labelContainer)}>Type</label>
                            </div>
                            <div>
                                <Field
                                    name="type"
                                    type="text"
                                    className={classname(styles.formInput)}
                                />
                            </div>
                            <ErrorMessage
                                name={"type"}
                                component="div"
                                className="field-error"
                            />
                        </div>
                        <div className={classname(styles.imageField, styles.formControl)}>
                            <div className={classname(styles.labelContainer)}>
                            <label htmlFor="modifier_image" className={classname(styles.formLabel, styles.labelContainer)}>
                                Image
                            </label>
                            </div>
                            <div>
                            <input type="file" name="modifier_image" max={1} className={classname(styles.formInput)}/>
                            </div>
                        </div>
                        <div className={classname(styles.titleWithNoBox)}>
                            <h4>Description</h4>
                        </div>
                        <div className={classname(styles.formControl)}>
                            <div>
                                <Field
                                    as="textarea"
                                    name="description"
                                    type="text"
                                    className={classname(styles.descriptionContainer)}
                                />
                            </div>
                            <ErrorMessage
                                name={"name"}
                                component="div"
                                className="field-error"
                            />
                        </div>
                        
                        <div>
                            <h6 className={classname(styles.titleWithNoBox)}>
                                Select Modifiers
                            </h6>
                            <div role="group" className={classname(styles.checkboxContainer)}>
                                {modifiers.map((m, i) => (
                                    <label className={classname(styles.checkBoxLabel)}>
                                         <Field type="checkbox" name="modifiers" value={m.name + i } key={i}/>
                                         {normalize(m.name)}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className={classname(styles.saveButtonContainer)}>
                            <button type="submit" className={classname(styles.ctaButton)}>Save Option</button>
                        </div>
                    </div>
                </Form>
            )
            }
        </Formik >
        </div>
    )
}