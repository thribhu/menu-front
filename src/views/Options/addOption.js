import React from "react";
import { useHistory } from "react-router-dom";
import classname from "classnames";
import styles from "./Options.module.sass";
import { isEmpty, merge, map, assign } from "lodash";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Table from "components/table";
import OrderTable from "components/orderTable";
import { normalizeText as normalize } from "utils/normalize";
import {
  addOption,
  updateOption,
  removeSelected,
} from "modules/options/actions";
import {
  loadingSelector,
  selectedOptionsSelector,
} from "modules/options/selector";
import {
  listSelector,
  loadingSelector as modLoad,
  errorSelector as modErr,
  messageSelector as modifierMessageSelector,
} from "modules/modifiers/selectors";
import { listModfiers } from "modules/modifiers/actions";
import { useSelector, useDispatch } from "react-redux";
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
      return map(row.value, (r) => (
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
  const dispatch = useDispatch();
  const modifiers = useSelector(listSelector);
  const modifierMessage = useSelector(modifierMessageSelector);
  const mod_loading = useSelector(modLoad);
  const nowOption = useSelector(selectedOptionsSelector);
  const [step1, setStep1] = React.useState(false);
  const [selected, setSelected] = React.useState(nowOption.modifiers || []);
  const [formValues, setForm] = React.useState();
  const [nowArray, setNowArray] = React.useState([]);
  const [showSelected, setShow] = React.useState(false);
  const history = useHistory();
  const handleSaveItem = () => {
    if (props.setOpen) {
      props.setOpen(false);
    }
    setStep1(false);
    const option = assign({}, formValues, {
      modifiers: nowArray.map((_) => _.original.id),
    });
    if (!isEmpty(nowOption)) {
      delete nowOption.modifiers;
      dispatch(updateOption(option));
    } else {
      dispatch(addOption(option));
    }
    setForm("");
    setSelected([]);
    setNowArray([]);
  };
  React.useEffect(() => {
    if (isEmpty(modifierMessage) && isEmpty(modifiers)) {
      dispatch(listModfiers());
    }
    return () => dispatch(removeSelected());
  }, [nowOption, dispatch]);
  return (
    <div className={classname(styles.container)}>
      {!step1 && (
        <>
          <div style={{ dispay: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "1.5rem", color: "red" }}>
              {!isEmpty(nowOption) ? "Update Option" : "Add Option"}
            </p>
          </div>
          <Formik
            initialValues={
              !isEmpty(nowOption)
                ? !isEmpty(formValues)
                  ? formValues
                  : nowOption
                : merge(initialValues, formValues)
            }
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setForm(values);
              setStep1(true);
              setShow(true);
            }}
            enableReinitialize
          >
            {({ values, isValid }) => (
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
                        htmlFor="image_url"
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
                        name="image_url"
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
                  <div className="flex-around">
                    <div className={classname(styles.saveButtonContainer)}>
                      <button
                        type="button"
                        disabled={!isValid}
                        className={classname(styles.ctaButton)}
                      >
                        {!isEmpty(selected)
                          ? "Edit Modifiers"
                          : "Select Modifers"}
                      </button>
                    </div>
                    <div className={classname(styles.saveButtonContainer)}>
                      <button className={classname(styles.ctaButton, "addButton")} type="submit">
                        {!isEmpty(nowOption) ? "Save Option" : "Add Option"}
                      </button>
                    </div>
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
              title={"Modifiers"}
              columns={columns}
              data={modifiers}
              updateSelectItems={setSelected}
              withCheckBox={true}
              noAction={true}
              preSelected={selected}
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
                    modifier
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {selected.length && !step1 && showSelected ? (
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
              {!isEmpty(nowOption) ? "Update Option" : "Add Option"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
