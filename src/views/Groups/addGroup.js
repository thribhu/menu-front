import React from 'react';
import classname from 'classnames';
import styles from './Groups.module.sass'
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import options from '../Options/options.json'
import { normalizeText as normalize } from 'utils/normalize'
const initialValues = {
    name: '',
    description: '',
    price: '',
    price_default: 2,
    options: [],
    min_required: 1,
    max_allowed: 1,
    display_order: 100
}
const validationSchema = yup.object({
    name: yup.string().required('A valid option must have name'),
    description: yup.string().optional(),
    image_url: yup.string().optional(),
    price: yup.number().required('A valid option must have price'),
    type: yup.string().optional(),
})
export default function AddGroup(props) {
    return (
        <div className={classname(styles.container)}>
            <div className={classname(styles.formTitle)}>
                <h4>
                    Add Group
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
                                    <label htmlFor="name" className={classname(styles.formLabel, styles.labelContainer)}>Name</label>
                                </div>
                                <div>
                                    <Field
                                        name="name"
                                        type="text"
                                        className={classname(styles.formInput)}
                                        autoFocus={true}
                                        required
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
                                    <label htmlFor="min_required" className={classname(styles.formLabel, styles.labelContainer)}>Min Required</label>
                                </div>
                                <div>
                                    <Field
                                        name="min_required"
                                        value={values.min_required}
                                        type="number"
                                        min={1}
                                        className={classname(styles.formInput)}
                                    />
                                </div>
                                <ErrorMessage
                                    name={"min_required"}
                                    component="div"
                                    className="field-error"
                                />
                            </div>
                            <div className={classname(styles.formControl)}>
                                <div className={classname(styles.labelContainer)}>
                                    <label htmlFor="max_allowed" className={classname(styles.formLabel, styles.labelContainer)}>Max Allowed</label>
                                </div>
                                <div>
                                    <Field
                                        name="max_allowed"
                                        value={values.max_allowed}
                                        type="number"
                                        min={1}
                                        className={classname(styles.formInput)}
                                    />
                                </div>
                                <ErrorMessage
                                    name={"max_allowed"}
                                    component="div"
                                    className="field-error"
                                />
                            </div>
                            <div className={classname(styles.formControl)}>
                                <div className={classname(styles.labelContainer)}>
                                    <label htmlFor="price_default" className={classname(styles.formLabel, styles.labelContainer)}>Price Default</label>
                                </div>
                                <div>
                                    <Field
                                        name="price_default"
                                        value={values.price_default}
                                        type="number"
                                        min={1}
                                        className={classname(styles.formInput)}
                                    />
                                </div>
                                <ErrorMessage
                                    name={"max_allowed"}
                                    component="div"
                                    className="field-error"
                                />
                            </div>
                            <div className={classname(styles.formControl)}>
                                <div className={classname(styles.labelContainer)}>
                                    <label htmlFor="display_order" className={classname(styles.formLabel, styles.labelContainer)}>Display order</label>
                                </div>
                                <div>
                                    <Field
                                        name="display_order"
                                        value={values.display_order}
                                        type="number"
                                        min={0}
                                        className={classname(styles.formInput)}
                                    />
                                </div>
                                <ErrorMessage
                                    name={"max_allowed"}
                                    component="div"
                                    className="field-error"
                                />
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
                                <h4 className={classname(styles.titleWithNoBox)}>
                                    Select Options
                            </h4>
                                <div role="group" className={classname(styles.checkboxContainer)}>
                                    {options.map((m, i) => (
                                        <label className={classname(styles.checkBoxLabel)}>
                                            <Field type="checkbox" name="options" value={m.name + i} key={i} />
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