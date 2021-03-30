import React from "react";
import classname from "classnames";
import styles from "./Items.module.sass";
import _, { isEmpty, merge } from "lodash";
import { Formik, Form, Field, ErrorMessage, isEmptyArray } from "formik";
import * as yup from "yup";
import { normalizeText as normalize } from "utils/normalize";
import Switch from "react-switch";
import Table from "components/table";
import { useHistory } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {listGroup} from 'modules/groups/actions'
import {listOptions} from 'modules/options/actions'
import {addItem, updateItem, removeSelected} from 'modules/items/actions'
import { ClockLoader } from 'react-spinners'
import {
  loadingSelector as group_loading,
  listSelector as groupsSelector,
  messageSelector
} from 'modules/groups/selector'
import {
  loadingSelector as options_loading,
  optionsSelector
} from 'modules/options/selector'
import {
  selectedSelector,
  loadingSelector,
} from 'modules/items/selector'
import {
  FaRegObjectGroup,
} from "react-icons/fa";
import OrderTable from "components/orderTable";
const initialValues = {
  name: "",
  description: "",
  image_url: "",
  price: "",
  type: "",
  stock: "",
};
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().optional(),
  price: yup.number().required("Price is required"),
  type: yup.string().optional(),
  stock: yup.number().optional(),
});
const columns = [
  {
    Header: "Name",
    accessor: (d) => {
      if (!_.isUndefined(d.min_required)) {
        return (
          <div>
            {normalize(d.name)}
            <FaRegObjectGroup style={{ padding: "0 5px" }} />
          </div>
        );
      } else {
        return d.name;
      }
    },
  },
  {
    Header: "Price",
    accessor: (d) => {
      if (!_.isUndefined(d.min_required)) {
        return d.price_default;
      } else return d.price;
    },
  },
  {
    Header: "Min",
    accessor: (d) => {
      if (!_.isUndefined(d.min_required)) {
        return d.min_required;
      } else return "-";
    },
  },
  {
    Header: "Max",
    accessor: (d) => {
      if (!_.isUndefined(d.min_required)) {
        return d.max_allowed;
      } else return "-";
    },
  },
];
export default function AddItem(props) {
  const dispatch = useDispatch()
  const history = useHistory();
  const groups = useSelector(groupsSelector)
  const options = useSelector(optionsSelector)
  const nowItem = useSelector(selectedSelector)
  const loading = useSelector(loadingSelector)
  const groupLoading = useSelector(group_loading)
  const optionLoading = useSelector(options_loading)
  const groupInfo = useSelector(messageSelector)
  if (isEmpty(groups) && isEmpty(groupInfo)) {
    dispatch(listGroup())
  }
  if (isEmpty(options)){
    dispatch(listOptions())
  }
  const [active, setActive] = React.useState(true);
  const [step1, setStep1] = React.useState(false);
  const [selected, setSelected] = React.useState([]);
  const [formValues, setForm] = React.useState();
  const [nowArray, setNowArray] = React.useState();
  const [showOrder, setShow] = React.useState(false)
  const tableData = [...groups, ...options] 
  React.useEffect(() => {
    return () => {
      dispatch(removeSelected())
    }
  }, [nowItem, dispatch])
  const handleSaveItem = () => {
      // we get all the row props, insted we only want original
    const originalArray = _.map(nowArray, n => n.original); 
    const values = formValues;
    const finalItem = _.assign({}, values, {options: originalArray})
    if(!isEmpty(nowItem)){
      dispatch(updateItem(finalItem))
    }
    else {
      dispatch(addItem(finalItem))
    }
    setForm(null);
  };
  return (
    <div>
      <div className={classname(styles.container)} style={{ flex: 1 }}>
        {!step1 && (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p style={{ fontSize: "1.5rem", color: "red" }}>{!isEmpty(nowItem) ? 'Update Item' : 'Add Item'}</p>
            </div>
            <Formik
              initialValues={!isEmpty(nowItem) ? !isEmpty(formValues) ?formValues :  nowItem :  _.merge(initialValues, formValues)}
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
                          Item
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
                    <div className={classname(styles.formControl)}>
                      <div className={classname(styles.labelContainer)}>
                        <label
                          htmlFor="stock"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                         Stock
                        </label>
                      </div>
                      <div>
                        <Field
                          name="stock"
                          type="number"
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
                        <label
                          htmlFor="active"
                          className={classname(
                            styles.formLabel,
                            styles.labelContainer
                          )}
                        >
                          Active
                        </label>
                      </div>
                      <div>
                        <Field name="active">
                          {({ field, form, meta }) => (
                            <Switch
                              name="active"
                              {...field}
                              onChange={(e) => {
                                setActive(e);
                              }}
                              checked={active}
                            />
                          )}
                        </Field>
                      </div>
                      <ErrorMessage
                        name={"type"}
                        component="div"
                        className="field-error"
                      />
                    </div>
                    <div
                      className={classname(
                        styles.imageField,
                        styles.formControl
                      )}
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
                title={"Options and groups"}
                columns={columns}
                data={tableData}
                updateSelectItems={setSelected}
                withCheckBox={true}
                noAction={true}
                preSelected={selected}
              />
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
                  Add to Item
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
      {selected.length && !step1 && showOrder ? (
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
                props.setOpen(false);
                handleSaveItem();
              }}
            >
              Save Item
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
