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
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
export default function Modifiers() {
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState();
  const [step1, setStep1] = React.useState(false);
  const [formValues, setForm] = React.useState();
  const [list, setList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [err, setError] = React.useState();
  const [request, setRequest] = React.useState(false)
  const history = useHistory();
  const baseUrl = "http://127.0.0.1:8000/api/modifiers/"
  React.useEffect(() => {
    setLoading(true);
    let promise = axios.get(baseUrl);
    promise
      .then((res) => {
        setList(res.data);
        setError();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, []);
  const handleEdit = (option) => {
    delete option.actions
    history.push(
      '/addModifier',
      option
    )
  }
  const handleDelete = option => {
    const confirm = window.confirm(`You are about to remove ${option.name}. This action is not reversable.`)
    if (confirm) {
      const removeModifier = axios.delete(baseUrl +option.id + "/")
      removeModifier.then(res => {
        if(res.status === 204) {
          alert('Modifier removed successfully')
        }
      })
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
  _.map(list, (option) =>
    _.assign(option, {
      actions: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "0 5px" }}>
            <button onClick={() => handleEdit(option)}>
              <FaEdit />
            </button>
          </div>
          <div>
            <button>
              <FaTrash onClick={() => handleDelete(option)}/>
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
      </Modal>
      <div>
        <Table
          columns={columns}
          data={list}
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
