import React from "react";
import { useHistory } from "react-router-dom";
import classname from "classnames";
import styles from "./Options.module.sass";
import _ from "lodash";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Table from "components/table";
import OrderTable from "components/orderTable";
import { normalizeText as normalize } from "utils/normalize";
import axios from "axios";
const initialValues = {
  name: "",
  description: "",
  image_url: "",
  price: "",
  type: "",
  modifiers: [],
};
const validationSchema = yup.object({
  name: yup.string().required("A valid option must have name"),
  description: yup.string().optional(),
  image_url: yup.string().optional(),
  price: yup.number().required("A valid option must have price"),
  type: yup.string().optional(),
});
const columns = [
  {
    Header: "Modifier",
    accessor: (d) => normalize(d.name),
  },
  {
    Header: "Options",
    accessor: "options",
    Cell: (row) => {
      return _.map(row.value, (r) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ display: "grid", gridTemplateColumns: "100px 100px" }}>
            <div style={{ padding: "0 5px" }}>{normalize(r.name)}</div>
            <div>{parseFloat(r.price).toFixed(2)}</div>
          </div>
        </div>
      ));
    },
  },
];
export default function AddOption(props) {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [step1, setStep1] = React.useState(false);
  const [nowOption, setNowOption] = React.useState();
  const [selected, setSelected] = React.useState([]);
  const [formValues, setForm] = React.useState();
  const [nowArray, setNowArray] = React.useState([]);
  const [reset, setReset] = React.useState(false);
  const [modifiers, setModifiers] = React.useState([]);
  const history = useHistory();
  const handleSaveItem = () => {
    if (props.setOpen) {
      props.setOpen(false);
    }
    setStep1(false);
    if(!_.isEmpty(nowOption)) {
      const id = formValues.id
      delete formValues.id
      const option = _.assign({}, formValues, {modifiers: _.map(selected, s => s.id)})
      const response = axios.put(baseUrl+`options/${id}/`, option)
      response.then(snapshot => {
        if (snapshot.status === 201){
          alert('Option updated successfully')
        }
      })
      .catch(err => {
        console.log(err)
        alert('Unable update option.')
      })
    }
    else {
      const response = axios.post(baseUrl+"options/", _.assign({}, formValues, {modifiers: _.map(selected, s => s.id)}))
      response.then(snapshot => {
        if(snapshot.status === 200){
          alert('Option added option')
        }
      })
      .catch(err => {
        console.log(err)
        alert('Unable to add option')
      })
    }
    setReset(true);
    setForm("");
    setSelected([]);
    setNowArray([]);
  };
  React.useEffect(() => {
    if (!_.isEmpty(props) && !_.isEmpty(props.location)) {
      const data = _.get(props, "location.state")
      setNowOption(data)
    }
    const response = axios.get(baseUrl + "modifiers/");
    response
      .then((snapshot) => {
        if (snapshot.status === 200) {
          setModifiers(snapshot.data);
        }
      })
      .catch((err) => console.log(err));
    return () => setNowOption("");
  }, [nowOption]);
  const dynamicValues = !_.isEmpty(nowOption)
    ? _.merge(initialValues, nowOption)
    : _.merge(initialValues, formValues);
  return (
    <div className={classname(styles.container)}>
      {!step1 && (
        <>
          <div style={{ dispay: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "1.5rem", color: "red" }}>
              {nowOption ? "Update Option" : "Add Option"}
            </p>
          </div>
          <Formik
            initialValues={_.merge(initialValues, nowOption, formValues)}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setForm(values);
              setStep1(true);
            }}
            enableReinitialize
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
                        Option
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
                        style={{ color: "red" }}
                        name={"name"}
                        component="div"
                        className="field-error"
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
                        className="field-error"
                        style={{ color: "red" }}
                      />
                    </div>
                  </div>
                  <div className={classname(styles.formControl)}>
                    <div className={classname(styles.labelContainer)}>
                      <label
                        htmlFor="type"
                        className={classname(
                          styles.formLabel,
                          styles.labelContainer
                        )}
                      >
                        Type
                      </label>
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
                  <div
                    className={classname(styles.imageField, styles.formControl)}
                  >
                    <div className={classname(styles.labelContainer)}>
                      <label
                        htmlFor="modifier_image"
                        className={classname(
                          styles.formLabel,
                          styles.labelContainer
                        )}
                      >
                        Image
                      </label>
                    </div>
                    <div>
                      <input
                        type="file"
                        name="modifier_image"
                        max={1}
                        className={classname(styles.formInput)}
                      />
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
                    <button
                      type="submit"
                      className={classname(styles.ctaButton)}
                    >
                      {nowOption ? "Edit Modifiers" : "Choose Modifers"}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {step1 && (
        <div className={classname(styles.tableContainer)}>
          <div className={classname(styles.tableFlex)}>
            <Table
              title={"Options and groups"}
              columns={columns}
              data={modifiers}
              updateSelectItems={setSelected}
              withCheckBox={true}
              noAction={true}
              preSelected={
                !_.isEmpty(nowOption)
                  ? nowOption.modifiers
                  : _.map(selected, (s) => s.name)
              }
            />
          </div>
          <div>
            <div className={classname(styles.margin5)}>
              <button
                className={classname(styles.button200)}
                onClick={() => history.push("/addModifier")}
              >
                Add Modifier
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
                    modifer
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
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
              {!_.isEmpty(nowOption) ? "Update Option" : "Add Option"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
