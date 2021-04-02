import React from "react";
import classname from "classnames";
import styles from "./Items.module.sass";
import _, { isEmpty, map } from "lodash";
import { Formik, Form, Field, ErrorMessage, isEmptyArray } from "formik";
import * as yup from "yup";
import { normalizeText as normalize } from "utils/normalize";
import Switch from "react-switch";
import Table from "components/table";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listGroup } from "modules/groups/actions";
import { listOptions } from "modules/options/actions";
import { addItem, updateItem, removeSelected, getListOptionGroups } from "modules/items/actions";
import {splitOptionsAndGroups} from './utils'
import {
  loadingSelector as group_loading,
  listSelector as groupsSelector,
  messageSelector,
} from "modules/groups/selector";
import {
  loadingSelector as options_loading,
  optionsSelector,
} from "modules/options/selector";
import { selectedSelector, loadingSelector, optionGroupsSelector } from "modules/items/selector";
import { FaRegObjectGroup } from "react-icons/fa";
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
    accessor:  "price",
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
const stichOptionsAndGroups = (list) => {
  let o = list.options 
  let g = list.option_groups 
  let res = o.concat(g)
  return res
}
export default function AddItem(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const groups = useSelector(groupsSelector);
  const options = useSelector(optionsSelector);
  const nowItem = useSelector(selectedSelector);
  let option_groups = useSelector(optionGroupsSelector) 
  const loading = useSelector(loadingSelector);
  const groupLoading = useSelector(group_loading);
  const optionLoading = useSelector(options_loading);
  const groupInfo = useSelector(messageSelector);
  const [active, setActive] = React.useState(true);
  const [step1, setStep1] = React.useState(false);
  const [groupsSelected, selectGroups] = React.useState(!isEmpty(nowItem) ? stichOptionsAndGroups(nowItem) : []);
  const [formValues, setForm] = React.useState();
  const [groupArray, setGroupArray] = React.useState();
  const [optionArray, setOptionArray] = React.useState()
  const [showOrder, setShow] = React.useState(false);

  //let tableData = groups.concat(options)
  React.useEffect(() => {
    if(isEmpty(option_groups)) {
      dispatch(getListOptionGroups())
    }
    return () => dispatch(removeSelected())
  }, [dispatch, option_groups]);
  const handleSaveItem = () => {
    // we get all the row props, insted we only want original
    const {option_groups, options} = splitOptionsAndGroups(map(groupArray, g => g.original))
    let _active
    if (active) {
      _active = 1
    }
    else _active = 0
    const values = formValues;
    const finalItem = _.assign({}, values, { active: _active, options, option_groups});
    if (!isEmpty(nowItem)) {
      dispatch(updateItem(finalItem));
    } else {
      dispatch(addItem(finalItem));
    }
    setForm(null);
    setShow(false)
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
              <p style={{ fontSize: "1.5rem", color: "red" }}>
                {!isEmpty(nowItem) ? "Update Item" : "Add Item"}
              </p>
            </div>
            <Formik
              initialValues={
                !isEmpty(nowItem)
                  ? !isEmpty(formValues)
                    ? formValues
                    : nowItem
                  : _.merge(initialValues, formValues)
              }
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setForm(values);
                setStep1(true);
                setShow(true)
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
        {step1 &&  (
          <div className={classname(styles.tableContainer)}>
            <div className={classname(styles.tableFlex)}>
              <Table
                title={"Options and groups"}
                columns={columns}
                data={option_groups}
                updateSelectItems={selectGroups}
                withCheckBox={true}
                noAction={true}
                preSelected={groupsSelected}
              />
            </div>
            <div className={classname(styles.between)}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ paddingTop: "5px" }}>
                  <button
                    onClick={() => setStep1(false)}
                    className={classname(styles.ctaButton)}
                  >
                    Back
                  </button>
                </div>
              </div>
              <div>
                <button
                  disabled={!groupsSelected.length}
                  className={classname(styles.ctaButton)}
                  onClick={() =>
                    groupsSelected.length ? setStep1(false) : null
                  }
                >
                  Add to Item
                </button>
                <div style={{ fontSize: "10px" }}>
                  {!groupsSelected.length && (
                    <p>
                      <span style={{ color: "red" }}>*</span> Select alteast 1
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {groupsSelected.length && !step1 && showOrder ? (
        <div style={{ flex: 1 }}>
          <div>Option Groups</div>
          <div>
            <OrderTable
              columns={columns}
              data={groupsSelected}
              updateCurrentRows={setGroupArray}
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
              Save Item
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
