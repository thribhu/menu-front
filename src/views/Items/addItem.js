import React from 'react';
import classname from 'classnames';
import styles from './Items.module.sass'
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import groups from '../Groups/groups.json'
import options from '../Options/options.json'
import modifiers from '../Modifiers/modifiers.json'
import {normalizeText as normalize} from 'utils/normalize'
import Modal from 'react-modal'
const initialValues = {
    name: '',
    description: '',
    image_url: '',
    price: '',
    type: '',
    active: 'true',
    options: [],
    groups: []
}
const validationSchema = yup.object({
    name: yup.string().required('A valid option must have name'),
    description: yup.string().optional(),
    image_url: yup.string().optional(),
    price: yup.number().required('A valid option must have price'),
    type: yup.string().optional(),
})
const onlyOptionNames = _.map(options, o => o.name)
export default function AddItem(props) {
    const [itemGroups, setGroups] = React.useState([])
    const handleGroupChange = (e) => {
        e.preventDefault();
        setGroups(itemGroups.concat(e.target.value))
    }
    const [open, setOpen] = React.useState(false)
    return (
        <div className={classname(styles.container)}>
            <div className={classname(styles.formTitle)}>
                <h4>
                Add Item
                </h4>
            </div>
            <Modal isOpen={open}>
                <div>Hi</div>
            </Modal>
        <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
            }}
        >
            {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className={classname(styles.formControl)}>
                            <div className={classname(styles.labelContainer)}>
                                <label htmlFor="name" className={classname(styles.formLabel, styles.labelContainer)}>Name</label>
                            </div>
                            <div>
                                <input
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
                                <input
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
                                <input
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
                                <input
                                    type="textarea"
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
                                Select Groups
                            </h6>
                            <div role="group" className=''>
                                {groups.map((m, i) => (
                                    <div className={classname(styles.checkboxContainer)}>
                                    <label className={classname(styles.checkBoxLabel)}>
                                        <input type="checkbox" name="groups" onChange={(e) => {
                                            handleChange('group')
                                           setOpen(true) 
                                        }} value={m.name}/>
                                        {normalize(m.name)}
                                    </label>
                                    <div>
                                        {
                                         _.map(values.groups, g => g.name).indexOf(m.name) > -1?
                                         <div>
                                            {
                                                JSON.stringify(_.filter(groups, {name: m.name}))
                                            }
                                        </div>
                                        : 
                                        null
                                        }
                                    </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* <div>
                            <h6 className={classname(styles.titleWithNoBox)}>
                                Select Options
                            </h6>
                            <div role="group" className={classname(styles.checkboxContainer)}>
                                {modifiers.map((m, i) => (
                                    <label className={classname(styles.checkBoxLabel)}>
                                         <Field name="options">
                                             {({field, form, meta}) => (
                                                 <div>
                                                     <div>
                                                     <input type="checkbox" value={m.name + i}/>
                                                     </div>
                                                     <div>
                                                         <p>{normalize(m.name)}</p>
                                                         <p>${m.price}</p>
                                                         <p>{m.type}</p>
                                                     </div>
                                                 </div>
                                             )}
                                             </Field>
                                         {normalize(m.name)}
                                    </label>
                                ))}
                            </div>
                        </div> */}
                        <div className={classname(styles.saveButtonContainer)}>
                            <button type="submit" className={classname(styles.ctaButton)} disabled>Save Option</button>
                        </div>
                    </div>
                </form>
            )
            }
        </Formik >
        </div>
    )
}