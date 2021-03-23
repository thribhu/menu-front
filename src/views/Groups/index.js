import React from "react";
import axios from 'axios'
import classname from "classnames";
import styles from "./Groups.module.sass";
import Modal from "react-modal";
import Table from "components/table";
import AddGroup from "views/Groups/addGroup";
import _, { map } from "lodash";
import { useHistory } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { normalizeText } from "utils/normalize";
const groupColumns = [
  {
    Header: "Group",
    accessor: d => normalizeText(d.name) || "-",
    width: 50,
  },
  {
    Header: "Display Order",
    accessor: d => d.order || "-",
  },
  {
    Header: "Price",
    accessor: d => d.price || 0,
  },
  {
    Header: "Max Allowed",
    accessor: d => d.max_allowed || 0,
  },
  {
    Header: "Min Required",
    accessor: d => d.min_required || 0,
  },
  {
    Header: "Options",
    accessor: d => {
      let names = _.map(d.options, _ => normalizeText(_.name))
      return names.join(", ") || "-"
    }
  },
  {
    Header: "Actions",
    accessor: "actions",
  },
];
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
export default function GroupsTable() {
  const baseUrl = "http://127.0.0.1:8000/api/";
  const [groups, setGroups] = React.useState([])
  const [options, setoptions] = React.useState([])
  const [selected, setSelected] = React.useState([]);
  const history = useHistory();
  const [form, setForm] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [step1, setSetp1] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
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
  React.useEffect(() => {
    setLoading(true);
    const options_res = axios.get(baseUrl + "options/");
    options_res.then(snapshot => {
      if(snapshot.status === 200){
        setoptions(snapshot.data)
      }
    })
    .catch(err => {
      console.error(err)
    })
    const response = axios.get(baseUrl + "groups/");
    response.then(snapshot => {
      if(snapshot.status === 200){
        setGroups(snapshot.data)
        setLoading(false)
      }
    })
    .catch(err => {
      console.error(err)
      setLoading(false)
    })
  }, []);
  const handleEdit = group => {
    delete group.actions
    history.push("/addGroup", group)
  }
  const handleRemove = group => {
    const confirm = window.confirm(`You are about to remove ${group.name}. This is not reversable`)
    if(confirm) {
      const request = axios.delete(baseUrl+`groups/${group.id}`)
      request.then(snapshot => {
        if (snapshot.status === 204) {
          alert('Group removed successfully')
        }
      })
      .catch(err => {
        console.error(err)
        alert('Unable to remove Gruop')
      })
    }
  }
  _.map(groups, (option) =>
    _.assign(option, {
      actions: (
        <div style={{ display: "flex" }}>
          <div style={{ padding: "0 5px" }}>
            <button onClick={() => handleEdit(option)}>
              <FaEdit />
            </button>
          </div>
          <div>
            <button onClick={() => handleRemove(option)}>
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
          setSetp1(false);
        }}
        style={customStyles}
      >
        {step1 && (
          <div>
            <button onClick={() => setSetp1(false)}>Back</button>
          </div>
        )}
        {!step1 ? (
          <AddGroup
            next={setSetp1}
            formMethod={setForm}
            currentForm={form}
            setOpen={setOpen}
          />
        ) : (
          <div>
            <Table
              updateSelectItems={setSelected}
              columns={columns}
              data={options}
            />
            <div className={classname(styles.buttonGroup)}>
              <div>
                <button className={classname(styles.ctaButton)}>
                  New Option
                </button>
              </div>
              <div>
                <button
                  className={classname(styles.ctaButton)}
                  style={{ width: "150px" }}
                  onClick={() =>
                    history.push("/addGroup", { currentForm: form, selected })
                  }
                >
                  Add options to group
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <div>
        <Table
          updateSelectItems={setSelected}
          columns={groupColumns}
          data={groups}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button
          onClick={() => setOpen(true)}
          className={classname(styles.ctaButton)}
        >
          Add Group
        </button>
      </div>
    </div>
  );
}
