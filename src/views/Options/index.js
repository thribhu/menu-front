import React from "react";
import _, { map } from "lodash";
import classname from "classnames";
import styles from "./Options.module.sass";
import { useHistory } from "react-router-dom";
import Table from "components/table";
import {normalizeText} from 'utils/normalize'
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import AddOption from './addOption'
import Modal from "react-modal";
import {useDispatch, useSelector} from 'react-redux'
import {listOptions, removeOption, setSelected, removeSelected} from 'modules/options/actions'
import {loadingSelector, errorSelector, optionsSelector } from 'modules/options/selector'
const useFetch = (action) => {
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(action)
  }, [])
}
export default function Options(props) {
  useFetch(listOptions())
  const dispatch = useDispatch()
  const options = useSelector(optionsSelector)
  const loading = useSelector(loadingSelector)
  const option_error = useSelector(errorSelector)
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([])
  const history = useHistory()
  const handleEdit = option => {
    delete option.actions
    history.push("/addOption", option)
  }
  const handleRemove = option => {
    dispatch(removeOption(option))
  }
  /*
  React.useEffect(() => {
    if(_.isEmpty(options)){
      dispatch(listOptions())
    }
  }, [options])
  */
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
      accessor: d => normalizeText(d.type) || "-",
    },
    {
      Header: "Modifiers",
      accessor: d => {
        let names = map(d.modifiers, _ => {
          return normalizeText(_.name)
        })
        return names.join(', ') || "-"
      },
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
          Add Option
        </button>
      </div>
    </div>
  );
}
