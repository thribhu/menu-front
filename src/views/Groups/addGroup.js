import React from "react";
import classname from "classnames";
import styles from "./Groups.module.sass";
import _ from "lodash";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import options from "../Options/options.json";
import { normalizeText as normalize } from "utils/normalize";
import OrderTable from "components/orderTable";
import Table from "components/table";
import { useHistory } from "react-router-dom";
const columns = [
  {
    Header: "Image",
    accessor: "image",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Type",
    accessor: "type",
  },
];
const initialValues = {
  name: "",
  description: "",
  price_default: 2,
  options: [],
  min_required: 1,
  max_allowed: 1,
  display_order: 100,
};
const validationSchema = yup.object({
  name: yup.string().required("A valid option must have name"),
  description: yup.string().optional(),
  image_url: yup.string().optional(),
  price_default: yup.number().required("A valid option must have price"),
  type: yup.string().optional(),
});
export default function AddGroup(props) {
  const [step1, setStep1] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [formValues, setForm] = React.useState();
  const [nowArray, setNowArray] = React.useState();
  const history = useHistory();
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
  const handleSaveItem = () => {
    setForm('')
    setNowArray([])
    setSelected([])
    if(props.setOpen) {
        props.setOpen(false)
    }
  };
  return (
    <div>
      <div className={classname(styles.container)} style={{ flex: 1 }}>
        {!step1 && (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "1.5rem", color: "red" }}>Add Group</p>
            </div>
            <Formik
              initialValues={_.merge(initialValues, formValues)}
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
                          autoFocus={true}
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
                          htmlFor="price_default"
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
                          name="price_default"
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
                          htmlFor="min_allowed"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Min Allowed
                        </label>
                      </div>
                      <div>
                        <Field
                          name="max_requried"
                          type="number"
                          className={classname(styles.formInput)}
                        />
                      </div>
                      <ErrorMessage
                        name={"min_allowed"}
                        component="div"
                        className="field-error"
                      />
                    </div>
                    <div className={classname(styles.formControl)}>
                      <div className={classname(styles.labelContainer)}>
                        <label
                          htmlFor="max_required"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Max Required
                        </label>
                      </div>
                      <div>
                        <Field
                          name="max_required"
                          type="number"
                          className={classname(styles.formInput)}
                        />
                      </div>
                      <ErrorMessage
                        name={"max_required"}
                        component="div"
                        className="field-error"
                      />
                    </div>
                    <div className={classname(styles.formControl)}>
                      <div className={classname(styles.labelContainer)}>
                        <label
                          htmlFor="display_order"
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
                          name="display_order"
                          type="number"
                          className={classname(styles.formInput)}
                        />
                      </div>
                      <ErrorMessage
                        name={"display_order"}
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
                        Add Options
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
                preSelected={_.map(selected, (s) => s.name)}
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
