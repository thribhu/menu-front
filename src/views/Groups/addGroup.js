import React from "react";
import axios from 'axios'
import classname from "classnames";
import styles from "./Groups.module.sass";
import _, { isEmpty } from "lodash";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { normalizeText as normalize } from "utils/normalize";
import OrderTable from "components/orderTable";
import Table from "components/table";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {addGroup, updateGroup, removeSelected} from 'modules/groups/actions'
import {loadingSelector,errorSelector, selectedSelector } from 'modules/groups/selector'
import {listOptions} from 'modules/options/actions'
import {loadingSelector as optionLoading, optionsSelector, errorSelector as optionError} from 'modules/options/selector'
const columns = [
  {
    Header: "Image",
    accessor: "image",
  },
  {
    Header: "Name",
    accessor: d => normalize(d.name),
  },
  {
    Header: "Price",
    accessor: d => d.price || 0,
  },
  {
    Header: "Type",
    accessor: d => normalize(d.type),
  },
];
const initialValues = {
  name: "",
  description: "",
  price: 2,
  options: [],
  min_required: 1,
  max_allowed: 1,
  order: 100,
};
const validationSchema = yup.object({
  name: yup.string().required("A valid option must have name"),
  description: yup.string().optional(),
  image_url: yup.string().optional(),
  price: yup.number().required("A valid option must have price"),
  type: yup.string().optional(),
});
export default function AddGroup(props) {
  const dispatch = useDispatch()
  const history = useHistory();
  const options = useSelector(optionsSelector)
  const loading = useSelector(loadingSelector)
  const error = useSelector(errorSelector)
  const option_loding = useSelector(optionLoading)
  const option_error = useSelector(optionError)
  const nowGroup = useSelector(selectedSelector)
  const [step1, setStep1] = React.useState(false);
  const [selected, setSelected] = React.useState(!isEmpty(nowGroup) ? nowGroup.options : []);
  const [formValues, setForm] = React.useState();
  const [nowArray, setNowArray] = React.useState();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  if(isEmpty(options)){
    dispatch(listOptions())
  }
  const handleSaveItem = () => {
      const group = _.assign({}, formValues, {options: selected.map(a => a.id)})
    if(!isEmpty(nowGroup)) {
      dispatch(updateGroup(group))
    }
    else {
      dispatch(addGroup(group))
    }
    setForm('')
    setNowArray([])
    setSelected([])
    if(props.setOpen) {
        props.setOpen(false)
    }
  };
  React.useEffect(() => {
    return (() => dispatch(removeSelected()))
  }, [nowGroup])
  return (
    <div>
      <div className={classname(styles.container)} style={{ flex: 1 }}>
        {!step1 && (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "1.5rem", color: "red" }}>{!isEmpty(nowGroup) ? 'Update Group' : 'Add Group'}</p>
            </div>
            <Formik
              initialValues={!isEmpty(nowGroup) ? nowGroup : _.merge(initialValues, formValues)}
              enableReinitialize
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setForm(values);
                setStep1(true);
              }}
            >
              {({ values }) => (
                <Form>
                  <div>
                    <div className={classname(styles.formControl)}>
                      <div className={classname(styles.labelContainer)}>
                        <label
                          htmlFor="name"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Group
                        </label>
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
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className={classname(styles.formControl)}>
                      <div className={classname(styles.labelContainer)}>
                        <label
                          htmlFor="price"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Price
                        </label>
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
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className={classname(styles.formControl)}>
                      <div className={classname(styles.labelContainer)}>
                        <label
                          htmlFor="min_requied"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Min Required
                        </label>
                      </div>
                      <div>
                        <Field
                          name="min_required"
                          type="number"
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
                        <label
                          htmlFor="max_allowed"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Max Allowed
                        </label>
                      </div>
                      <div>
                        <Field
                          name="max_allowed"
                          type="number"
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
                        <label
                          htmlFor="order"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Display order
                        </label>
                      </div>
                      <div>
                        <Field
                          name="order"
                          type="number"
                          className={classname(styles.formInput)}
                        />
                      </div>
                      <ErrorMessage
                        name={"order"}
                        component="div"
                        className="field-error"
                      />
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
                      <button
                        type="submit"
                        className={classname(styles.ctaButton)}
                      >
                         Choose Options
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        )}
        {step1 && (
          <div className={classname(styles.tableContainer)}>
            <div className={classname(styles.tableFlex)}>
              <Table
                title={"Options"}
                columns={columns}
                data={options}
                updateSelectItems={setSelected}
                withCheckBox={true}
                noAction={true}
                preSelected={selected}
              />
            </div>
            <div>
              <div>
                <button
                  className={classname(styles.button200)}
                  onClick={() => history.push("/addOption")}
                >
                  Add Option
                </button>
              </div>
            </div>
            <div className={classname(styles.between)}>
              <div>
                <button
                  onClick={() => setStep1(false)}
                  className={classname(styles.ctaButton)}
                >
                  Back
                </button>
              </div>
              <div>
                <button
                  disabled={!selected.length}
                  className={classname(styles.ctaButton)}
                  onClick={() => (selected.length ? setStep1(false) : null)}
                >
                  Save
                </button>
                <div style={{ fontSize: "10px" }}>
                  {!selected.length && (
                    <p>
                      <span style={{ color: "red" }}>*</span> Select alteast 1
                      option
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {selected.length && !step1 ? (
        <div style={{ flex: 1 }}>
          <div>
            <OrderTable
              columns={columns}
              data={selected}
              updateCurrentRows={setNowArray}
            />
          </div>
          <div
            style={{
              margin: "10px auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className={styles.ctaButton}
              onClick={() => {
                handleSaveItem();
              }}
            >
              Save Group
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
