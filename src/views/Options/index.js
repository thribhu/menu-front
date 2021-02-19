import React from "react";
import _ from "lodash";
import classname from "classnames";
import styles from "./Options.module.sass";
import { useHistory } from "react-router-dom";
import Table from "components/table";
import options from "./options.json";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import AddOption from './addOption'
import Modal from "react-modal";
export default function Options(props) {
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState(false);
  const columns = [
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
    {
      Header: "Modifiers",
      accessor: (d) => d.modifiers.join(", "),
    },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];
  _.map(options, (option) =>
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
  return (
    <div className={classname(styles.tableContainer)}>
      <Modal isOpen={open} style={customStyles}>
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
          <AddOption setOpen={setOpen}  />
        </div>
      </Modal>
      <div>
        <Table
          columns={columns}
          data={options}
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
          Add Option
        </button>
      </div>
    </div>
  );
}
