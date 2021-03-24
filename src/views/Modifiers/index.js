import React from "react";
import classname from "classnames";
import styles from "./Modifiers.module.sass";
import { useHistory } from "react-router-dom";
import Table from "components/table";
import { normalizeText as normalize } from "utils/normalize";
import _ from "lodash";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import Modal from "react-modal";
import AddModifier from "./addModifier";
import CircularProgress from "@material-ui/core/CircularProgress";
import {useDispatch, useSelector} from 'react-redux'
import {listModfiers, removeModifier, selectModifier} from 'modules/modifiers/actions'
import {loadingSelector, errorSelector, listSelector} from 'modules/modifiers/selectors'
export default function Modifiers() {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector)
  const error = useSelector(errorSelector)
  const modifiers = useSelector(listSelector)
  if(_.isEmpty(modifiers)) {
    dispatch(listModfiers())
  }
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState();
  const [step1, setStep1] = React.useState(false);
  const [formValues, setForm] = React.useState();
  const history = useHistory();
  const handleEdit = (modifier) => {
    delete modifier.actions
    dispatch(selectModifier(modifier))
    history.push(
      '/addModifier',
    )
  }
  const handleDelete = modifier => {
    const confirm = window.confirm(`You are about to remove ${modifier.name}. This action is not reversable.`)
    if (confirm) {
      dispatch(removeModifier(modifier.id))
    }
  }
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
        return _.map(row.value, (r) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
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
  _.map(modifiers, (modifier) =>
    _.assign(modifier, {
      actions: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "0 5px" }}>
            <button onClick={() => handleEdit(modifier)}>
              <FaEdit />
            </button>
          </div>
          <div>
            <button>
              <FaTrash onClick={() => handleDelete(modifier)}/>
            </button>
          </div>
        </div>
      ),
    })
  );
  return (
    <div className={classname(styles.tableContainer)}>
      {loading && <div style={{display: 'flex', justifyContent:'center', alignItems: 'center'}}><CircularProgress/></div>}
      <Modal
        isOpen={open}
        onRequestClose={() => {
          setOpen(false);
          setStep1(false);
        }}
        style={customStyles}
      >
        <div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} className={classname(styles.transparent)}>
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
          />
        ) : (
          <div></div>
        )}
        </div>
      </Modal>
      <div>
        <Table
          columns={columns}
          data={modifiers}
          updateSelectItems={setSelected}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button
          onClick={() => setOpen(true)}
          className={classname(styles.ctaButton)}
        >
          Add Modifier
        </button>
      </div>
    </div>
  );
}
