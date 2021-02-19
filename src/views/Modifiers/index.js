import React from "react";
import classname from "classnames";
import styles from "./Modifiers.module.sass";
import { useHistory } from "react-router-dom";
import Table from "components/table";
import modifiers from "./modifiers.json";
import { normalizeText as normalize } from "utils/normalize";
import _ from "lodash";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import AddModifier from "./addModifier";
export default function Modifiers() {
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState();
  const [step1, setStep1] = React.useState(false);
  const [formValues, setForm] = React.useState()
  const history = useHistory();
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
              <div>{parseFloat(r.value).toFixed(2)}</div>
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
  _.map(modifiers, (option) =>
    _.assign(option, {
      actions: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "0 5px" }}>
            <button>
              <FaEdit />
            </button>
          </div>
          <div>
            <button>
              <FaTrash />
            </button>
          </div>
        </div>
      ),
    })
  );
  return (
    <div className={classname(styles.tableContainer)}>
      <Modal
        isOpen={open}
        onRequestClose={() => {
          setOpen(false);
          setStep1(false);
        }}
        style={customStyles}
      >
        {step1 && (
          <div>
            <button onClick={() => setStep1(false)}>Back</button>
          </div>
        )}
        {
            !step1 ? (
                <AddModifier next={setStep1} formMethod={setForm} currentForm={formValues} setOpen={setOpen}/>
            )
            :
            (
                <div>
                </div>
            )
        }
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
