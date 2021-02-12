import React from 'react';
import classname from 'classnames';
import styles from './Groups.module.sass'
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import options from '../Options/options.json'
import { normalizeText as normalize } from 'utils/normalize'
import Table from 'components/orderTable'
import Modal from 'react-modal'
const columns = [
    {
        Header: 'Image',
        accessor: 'image'
    },
    {
        Header: 'Name',
        accessor: 'name'
    },
    {
        Header: 'Price',
        accessor: 'price'
    },
    {
        Header: 'Type',
        accessor: 'type'
    },
]
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
    const [showTable, setTableShow] = React.useState(false);
    const [selected, setSelected] = React.useState([]);
    const customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };
    return (
        <div className={classname(styles.container)}>
        <Modal
            isOpen={showTable}
            onRequestClose={() => setTableShow(false)}
            style={customStyles}
        >
            <Table updateSelectItems={setSelected} columns={columns} data={options}/>
        </Modal>
            <div className={classname(styles.titleContainer)}>
            <div className={classname(styles.formTitle)}>
                <h4>
                    Add Group
                </h4>
            </div>
            </div>
            <div className={styles.formContainer}>
            <Formik
                enableReinitialize
                initialValues={_.merge(initialValues, props.currentForm)}
                onSubmit={async (values) => {
                    props.formMethod(values)
                    props.next(true)
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
                            <div>
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
                            <div className={classname(styles.saveButtonContainer)}>
                                <button type="submit" className={classname(styles.ctaButton)}>Add Option</button>
                            </div>
                        </div>
                    </Form>
                )
                }
            </Formik >
            </div>
        </div>
    )
}