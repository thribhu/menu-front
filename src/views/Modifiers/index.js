import React from "react";
import classname from "classnames";
import styles from "./Modifiers.module.sass";
import { useHistory } from "react-router-dom";
import Table from "components/table";
import { normalizeText as normalize } from "utils/normalize";
import _, { isEmpty } from "lodash";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import Modal from "react-modal";
import AddModifier from "./addModifier";
import { useDispatch, useSelector } from "react-redux";
import { listModfiers, removeModifier, setSelected as selectModifier } from "modules/modifiers/actions";
import {
  loadingSelector,
  listSelector,
  messageSelector
} from "modules/modifiers/selectors";
import { ClockLoader } from "react-spinners";
export default function Modifiers() {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const modifiers = useSelector(listSelector);
  const message = useSelector(messageSelector)
  React.useEffect(
    () => {
      if(isEmpty(message) && isEmpty(modifiers)) {
        dispatch(listModfiers())
      }
    }
  , [dispatch, modifiers])
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState();
  const [step1, setStep1] = React.useState(false);
  const [formValues, setForm] = React.useState();
  const history = useHistory();
  const handleEdit = (modifier) => {
    delete modifier.actions;
    dispatch(selectModifier(modifier))
    history.push("/addModifier");
  };
  const handleDelete = (modifier) => {
    const confirm = window.confirm(
      `You are about to remove ${modifier.name}. This action is not reversable.`
    );
    if (confirm) {
      dispatch(removeModifier(modifier.id));
    }
  };
  const customStyles = {
    content: {
      margin: "auto",
      height: "80%",
      width: "100%",
      maxWidth: "600px",
      overflow: "auto",
      position: "absolute",
      top: "50%",
      left: "50%",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };
  const columns = [
    {
      Header: "Modifier",
      accessor: (d) => normalize(d.name),
    },
    {
      Header: "Options",
      accessor: "options",
      Cell: (row) => {
        return _.map(row.value, (r, i) => (
          <div style={{ display: "flex", justifyContent: "center" }} key={i}>
            <div
              style={{ display: "grid", gridTemplateColumns: "100px 100px" }}
            >
              <div style={{ padding: "0 5px" }}>{normalize(r.name)}</div>
              <div>{parseFloat(r.price).toFixed(2)}</div>
            </div>
          </div>
        ));
      },
    },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];
  _.map(modifiers, (modifier, i) =>
    _.assign(modifier, {
      actions: (
        <div className="flex center" key={i}>
          <div className="h-padding-5">
            <button onClick={() => handleEdit(modifier)} className="icon-button">
              <FaEdit />
            </button>
          </div>
          <div >
            <button onClick={() => handleDelete(modifier)} className="icon-button">
              <FaTrash />
            </button>
          </div>
        </div>
      ),
    })
  );
  return (
    <div>
      {loading ? (
        <div className="CenterMe">
          <ClockLoader className="IamLoader"/>
        </div>
      ) : (
        <div className={classname(styles.tableContainer)}>
          <Modal
            isOpen={open}
            onRequestClose={() => {
              setOpen(false);
              setStep1(false);
            }}
            style={customStyles}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setOpen(false)}
                  style={{ cursor: "pointer" }}
                  className={classname(styles.transparent)}
                >
                  <FaWindowClose />
                </button>
              </div>
              {step1 && (
                <div>
                  <button onClick={() => setStep1(false)}>Back</button>
                </div>
              )}
              {!step1 ? (
                <AddModifier
                  next={setStep1}
                  formMethod={setForm}
                  currentForm={formValues}
                  setOpen={setOpen}
                  hideBack={true}
                />
              ) : (
                <div />
              )}
            </div>
          </Modal>
          <div>
            <Table
              columns={columns}
              data={modifiers}
              updateSelectItems={setSelected}
              cb_name="Add New Modifier"
              callback={() => setOpen(true)}
            />
        {
          !isEmpty(message) && 
          <div className="UcenterWithMargin IamInfo">
           * Add Modifiers to view in this table 
          </div>
        }
          </div>
        </div>
      )}
    </div>
  );
}
