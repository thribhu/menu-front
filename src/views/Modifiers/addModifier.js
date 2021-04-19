import React from 'react';
import classname from 'classnames'
import {useHistory} from 'react-router-dom'
import styles from './Modifiers.module.sass';
import {BiArrowBack} from 'react-icons/bi'
import { Formik, ErrorMessage, Field, Form, FieldArray} from 'formik';
import * as yup from 'yup';
import {FaPlusSquare, FaMinusSquare} from 'react-icons/fa'
import { isEmpty, reverse, merge, isUndefined } from 'lodash';
import {useSelector, useDispatch} from 'react-redux'
import {addModifier, updateModifier, removeSelected} from 'modules/modifiers/actions'
import {selectedSelector,loadingSelector, errorSelector } from 'modules/modifiers/selectors'
import {ClockLoader} from 'react-spinners'
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
    const dispatch = useDispatch()
    const nowModifier = useSelector(selectedSelector)
    const loading = useSelector(loadingSelector)
    const error = useSelector(errorSelector)
    const history = useHistory()
    const [form, setForm] = React.useState()
    React.useEffect(() => {
        return () => {
            dispatch(removeSelected())
        }
    }, [nowModifier, dispatch])
    const handleSubmit = (values) => {
        let {name, options} = values
        const modifier = {name, options: reverse(options)}
        if(!isEmpty(nowModifier)){
            dispatch(updateModifier(merge(nowModifier, modifier)))
        }
        else {
            dispatch(addModifier(modifier))
        }
    }
    const reverseOptionsAndReturn = data => {
        const {name, options} = data
        const modifier = {name, options: reverse(options)}
        return modifier
    }
    return (
        <div className="container">
              {isUndefined(props.hideBack) && (
                <div
                  className="flex h-padding-10"
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <button
                    className="icon-button"
                    onClick={() => history.push("/modifiers")}
                  >
                    <BiArrowBack />
                    Back
                  </button>
                </div>
              )}
            <div className="flex center">
              <p style={{ fontSize: "1.5rem", color: "red" }}>{!isEmpty(nowModifier) ? "Update Modifier" : "Add Modifier"}</p>
            </div>
            <Formik
                initialValues={!isEmpty(nowModifier) ? reverseOptionsAndReturn(nowModifier): initialValues}
                validationSchema = {validationSchema}
                onSubmit={(values) => {
                    setForm(values)
                    handleSubmit(values)
                }}
                enableReinitialize
            >
                {({ values }) => (
                    <Form>
                        <div>
                            <div className={classname(styles.formControl, "h-padding-10")}>
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
                                    {({ insert, remove}) => (
                                        <div>
                                            {values.options.length > 0 &&
                                                values.options.map((option, index) => (
                                                    <div className={classname(styles.horizontalContent)} key={index}>
                                                        <div className={classname(styles.formControl, "h-padding-10")}>
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
                                                        <div className={classname(styles.formControl, "h-padding-10")}>
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
                            {
                                loading ?
                                    <ClockLoader className="IamLoader"/>
                                    :
                                    <button type="submit" className="cta-button add-button">Save</button>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
