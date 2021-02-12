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
import OptionModal from 'modals/Options'
import Switch from 'react-switch'
const groupOptions = Groups.map(g => { return { label: normalize(g.name), value: g.name } })
const optionsForSelect = Options.map(g => { return { label: normalize(g.name), value: g.name } })
const initialValues = {
    name: '',
    description: '',
    image_url: '',
    price: '',
    type: '',
    stock: '',
}
const validationSchema = yup.object({
    name: yup.string().required('A valid option must have name'),
    description: yup.string().optional(),
    price: yup.number().required('A valid option must have price'),
    type: yup.string().optional(),
    stock: yup.number().optional(),
})
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        width: '400px'
    }
};

export default function AddOption(props) {
    const [groups, setGroups] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const [nowGroup, setNowGroup] = React.useState();
    const [nowOption, setNowOption] = React.useState();
    const [open, setOpen] = React.useState(false)
    const [optionOpen, setOptionOpen] = React.useState(false)
    const [active, setActive] = React.useState(true)
    function showSingleOption(option) {
        let validOptions = Options.map(o => o.name);
        if (validOptions.indexOf(option) > -1) {
            return (
                <div className={classname(styles.right_bar_button)} onClick={() => { setNowOption(option); setOptionOpen(true) }}>
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
                <div className={classname(styles.right_bar_button)} onClick={() => { setNowGroup(group); setOpen(true) }}>
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
                        let item = _.assign({}, values, { options_groups: groups, active, options })
                        alert(JSON.stringify(item, null, 2));
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
                                <div className={classname(styles.saveButtonContainer)}>
                                    <button type="submit" className={classname(styles.ctaButton)}>Save Option</button>
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