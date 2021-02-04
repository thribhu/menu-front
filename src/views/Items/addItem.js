import React from 'react';
import classname from 'classnames';
import styles from './Items.module.sass'
import _ from 'lodash';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Groups from '../Groups/groups.json';
import Options from '../Options/options.json'
import { normalizeText as normalize } from 'utils/normalize'
import Select from 'react-select';
import Modal from 'react-modal'
import GroupModal from 'modals/Groups'
const groupOptions = Groups.map(g => { return { label: normalize(g.name), value: g.name } })
const optionsForSelect = Options.map(g => { return { label: normalize(g.name), value: g.name } })
const initialValues = {
    name: '',
    description: '',
    image_url: '',
    price: '',
    type: '',
    stock: '',
    active: true,
    options_groups: [],
    options: []
}
const validationSchema = yup.object({
    name: yup.string().required('A valid option must have name'),
    description: yup.string().optional(),
    price: yup.number().required('A valid option must have price'),
    type: yup.string().optional(),
    stock: yup.number().optional(),
    active: yup.boolean().optional(),
})

export default function AddOption(props) {
    const [groups, setGroups] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [nowGroup, setNowGroup] = React.useState();
    const [nowOption, setNowOption] = React.useState();
    const [open, setOpen] = React.useState(false)
    function showSingleOption(option) {
        let validOptions = Options.map(o => o.name);
        if (validOptions.indexOf(option) > -1) {
            return (
                <div className={classname(styles.right_bar_button)} onClick={() => setNowOption(option)}>
                    <div>
                        {option}
                    </div>
                    <div>
                        <img src="/assets/info.svg" height="18px" width="18px" />
                    </div>
                </div>
            )
        }
    }
    function ShowSingleGroup(group) {
        if (!group) return null;
        const names = Groups.map(g => g.name)
        if (names.indexOf(group) > -1) {
            let optionsToShow = _.filter(Groups, { name: group }).options
            return (
                <div className={classname(styles.right_bar_button)} onClick={() => {setNowGroup(group);setOpen(true)}}>
                    <div>
                        {group}
                    </div>
                    <div>
                        <img src="/assets/info.svg" height="18px" width="18px" />
                    </div>
                </div>
            )
        }
        else return null
    }
    return (
        <div className={classname(styles.container)}>
            <div>
                <div className={classname(styles.formTitle)}>
                    <h4>
                        Add Item
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
                                        <label htmlFor="name" className={classname(styles.formLabel, styles.labelContainer)}>Item</label>
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
                                        <input type="file" name="modifier_image" max={1} className={classname(styles.formInput)} />
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

                                <div className={classname(styles.multiSelectWidth)}>
                                    <h6 className={classname(styles.titleWithNoBox)}>
                                        Select Groups
                            </h6>
                                    <div role="group" className={classname(styles.checkboxContainer)}>
                                        <Select name="options_groups" options={groupOptions} isMulti onChange={
                                            e => {
                                                setGroups(e.map(i => i.value))
                                            }
                                        }
                                        />
                                    </div>
                                </div>
                                <div className={classname(styles.multiSelectWidth)}>
                                    <h6 className={classname(styles.titleWithNoBox)}>
                                        Select Options
                            </h6>
                                    <div role="group" className={classname(styles.checkboxContainer)}>
                                        <Select name="options_groups" options={optionsForSelect} isMulti onChange={
                                            e => {
                                                setOptions(e.map(i => i.value))
                                            }
                                        } />
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
            <div className={classname(styles.right_bar)}>
                <div className={classname(styles.right_bar_content)}>
                    <div className={classname(styles.titleWithNoBox)}>
                        <h4>Selected Groups</h4>
                    </div>
                    <div>
                        {groups.length ?
                            groups.map(g => (
                                <div>
                                    {ShowSingleGroup(g)}
                                </div>
                            ))
                            :
                            'Your selected groups are shown here '
                        }
                    </div>
                </div>
                <div className={classname(styles.right_bar_content)}>
                    <div className={classname(styles.titleWithNoBox)}>
                        <h4>Selectd Options</h4>
                    </div>
                    <div>
                        {
                            options.length ? options.map(option => (
                                <div>
                                    {showSingleOption(option)}
                                </div>
                            ))
                                :
                                'You selected options are shown here'
                        }
                    </div>
                </div>
            </div>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
            >
                <GroupModal group={nowGroup}/>
            </Modal>
        </div>
    )
}