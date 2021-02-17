import React from 'react';
import classname from 'classnames';
import styles from './Items.module.sass'
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Groups from '../Groups/groups.json';
import Options from '../Options/options.json'
import { normalizeText as normalize } from 'utils/normalize'
import Modal from 'react-modal'
import Switch from 'react-switch'
import Table from 'components/table'
import { useHistory } from 'react-router-dom'
import { FaRegObjectGroup, FaEdit, FaTrash, FaStroopwafel } from 'react-icons/fa'
import OrderTable from 'components/orderTable'
const tableData = Groups.concat(Options)
const initialValues = {
    name: '',
    description: '',
    image_url: '',
    price: '',
    type: '',
    stock: '',
}
const validationSchema = yup.object({
    name: yup.string().required('Name is required'),
    description: yup.string().optional(),
    price: yup.number().required('Price is required'),
    type: yup.string().optional(),
    stock: yup.number().optional(),
})
const columns = [
    {
        Header: "Name",
        accessor: d => {
            if (!_.isUndefined(d.min_required)) {
                return (
                    <div>
                        {d.name}
                        <FaRegObjectGroup style={{ padding: '0 5px' }} />
                    </div>
                )
            }
            else {
                return d.name
            }
        }
    },
    {
        Header: "Price",
        accessor: d => {
            if (!_.isUndefined(d.min_required)) {
                return d.price_default
            }
            else return d.price
        }
    },
    {
        Header: 'Min',
        accessor: d => {
            if (!_.isUndefined(d.min_required)) {
                return d.min_required
            }
            else return '-'
        }
    },
    {
        Header: 'Max',
        accessor: d => {
            if (!_.isUndefined(d.min_required)) {
                return d.max_allowed
            }
            else return '-'
        }
    },
    {
        Header: 'Order',
        accessor: d => {
            if (!_.isUndefined(d.min_required)) {
                return d.display_order
            }
            else return '-'
        }
    },
    {
        Header: 'Actions',
        accessor: "actions"
    }

]
export default function AddOption(props) {
    const [active, setActive] = React.useState(true)
    const [step1, setStep1] = React.useState(false)
    const [selected, setSelected] = React.useState([])
    const [formValues, setForm] = React.useState()
    const history = useHistory()
    _.map(tableData, item => _.assign(item, {
        actions: (
            <div style={{ display: 'flex' }}>
                <div style={{ padding: '0 5px' }}>
                    <button>
                        <FaEdit />
                    </button>
                </div>
            </div>
        )
    }))
    return (
        <div>
            <div className={classname(styles.container)} style={{ flex: 1 }}>
                {!step1 &&
                    <div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <p style={{fontSize: '1.5rem', color: 'red'}}>
                                Add Item
                </p>
                        </div>
                        <Formik
                            initialValues={_.merge(initialValues, formValues)}
                            validationSchema={validationSchema}
                            onSubmit={async (values) => {
                                // await new Promise((r) => setTimeout(r, 500));
                                // let item = _.assign({}, values)
                                // alert(JSON.stringify(item, null, 2));
                                setForm(values)
                                setStep1(true)
                            }}
                        >
                            {({ values }) => (
                                <Form>
                                    <div>
                                        <div className={classname(styles.formControl)}>
                                            <div className={classname(styles.labelContainer)}>
                                                <label htmlFor="name" className={classname(styles.formLabel, styles.labelContainer)}>Item</label>
                                            </div>
                                            <div>
                                                <Field
                                                    name="name"
                                                    type="text"
                                                    className={classname(styles.formInput)}
                                                    autoFocus={true}
                                                />
                                            <ErrorMessage
                                                name={"name"}
                                                component="div"
                                                style={{color: 'red'}}
                                            />
                                            </div>
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
                                            <ErrorMessage
                                                name={"price"}
                                                component="div"
                                                style={{color: 'red'}}
                                            />
                                            </div>
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
                                        <div className={classname(styles.formControl)}>
                                            <div className={classname(styles.labelContainer)}>
                                                <label htmlFor="active" className={classname(styles.formLabel, styles.labelContainer)}>Active</label>
                                            </div>
                                            <div>
                                                <Field
                                                    name="active"
                                                >
                                                    {({ field, form, meta }) => (
                                                        <Switch name="active" {...field}
                                                            onChange={e => {
                                                                setActive(e)
                                                            }}
                                                            checked={active} />
                                                    )}
                                                </Field>
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
                                                <input type="file" name="modifier_image" max={1} className={classname(styles.formInput)} />
                                            </div>
                                        </div>
                                        <div className={classname(styles.titleWithNoBox)}>
                                            <h4>Description</h4>
                                        </div>
                                        <div className={classname(styles.descriptionBox)}>
                                            <div>
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    type="text"
                                                    className={classname(styles.descriptionContainer)}
                                                />
                                            </div>
                                            <ErrorMessage
                                                name={"description"}
                                                component="div"
                                                className="field-error"
                                            />
                                        </div>
                                        <div className={classname(styles.saveButtonContainer)}>
                                            <button type="submit" className={classname(styles.ctaButton)}>Add Options</button>
                                        </div>
                                    </div>
                                </Form>
                            )
                            }
                        </Formik >
                    </div>
                }
                {
                    step1 &&
                    <div className={classname(styles.tableContainer)}>
                        <div className={classname(styles.tableFlex)}>
                            <Table columns={columns} data={tableData} updateSelectItems={setSelected} />
                        </div>
                        <div>
                            <div className={classname(styles.margin5)}>
                                <button className={classname(styles.button200)} onClick={() => history.push('/addGroup')}>
                                    Add OptionGroup
                            </button>
                            </div>
                            <div>
                                <button className={classname(styles.button200)} onClick={() => history.push('/addOption')}>
                                    Add Option
                            </button>
                            </div>
                        </div>
                        <div className={classname(styles.between)}>
                            <div>
                                <button onClick={() => setStep1(false)} className={classname(styles.ctaButton)}>
                                    Back
                            </button>
                            </div>
                            <div>
                                <button disabled={!selected.length} className={classname(styles.ctaButton)} onClick={() => selected.length ? setStep1(false) : null}>
                                    Save
                        </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {
                (selected.length && !step1) ?
                    <div style={{ flex: 1 }}>
                        <div>
                        <Table columns={columns} data={selected} withCheckBox={true} noAction={true}/>
                        </div>
                        <div style={{margin: '10px auto', display: 'flex', justifyContent: 'center'}}>
                            <button className={styles.ctaButton} onClick={() => {props.setOpen(false); setForm(null)}}>
                                Save Item
                            </button>
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )
}