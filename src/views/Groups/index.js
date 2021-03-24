import React from "react";
import classname from "classnames";
import styles from "./Groups.module.sass";
import Modal from "react-modal";
import Table from "components/table";
import AddGroup from "views/Groups/addGroup";
import _, { isEmpty, map } from "lodash";
import { useHistory } from "react-router-dom";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { normalizeText } from "utils/normalize";
import {listGroup, removeGroup, selectGroup} from 'modules/groups/actions'
import { loadingSelector, errorSelector, listSelector, messageSelector } from 'modules/groups/selector'
import {listOptions} from 'modules/options/actions'
import {loadingSelector as optionLoading, optionsSelector, errorSelector as optionError} from 'modules/options/selector'
import {useDispatch, useSelector} from 'react-redux'
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
  const dispatch = useDispatch()
  const history = useHistory();
  const groups = useSelector(listSelector)
  const message = useSelector(messageSelector)
  const options = useSelector(optionsSelector)
  const loading = useSelector(loadingSelector)
  const error = useSelector(errorSelector)
  const options_loading = useSelector(optionLoading)
  const option_error = useSelector(optionError)
  const [selected, setSelected] = React.useState([]);
  const [form, setForm] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [step1, setSetp1] = React.useState(false);
  if(isEmpty(groups) && !message){
    dispatch(listGroup())
  }
  if(isEmpty(options)){
    dispatch(listOptions)
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
  const handleEdit = group => {
    delete group.actions
    dispatch(selectGroup(group))
    history.push("/addGroup")
  }
  const handleRemove = group => {
    const confirm = window.confirm(`You are about to remove ${group.name}. This is not reversable`)
    if(confirm) {
      dispatch(removeGroup(group.id))
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
        <div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} className={classname(styles.transparent)}>
                            <FaWindowClose />
                        </button>
                    </div>
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
        </div>
      </Modal>
      <div>
        <Table
          updateSelectItems={setSelected}
          columns={groupColumns}
          data={groups}
        />
        {
          !isEmpty(message) && 
          <div className="UcenterWithMargin IamInfo">
           * Add modifiers to view in this table 
          </div>
        }
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
