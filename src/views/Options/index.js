import React from "react";
import { map, assign, isEmpty } from "lodash";
import classname from "classnames";
import styles from "./Options.module.sass";
import { useHistory } from "react-router-dom";
import Table from "components/table";
import {normalizeText} from 'utils/normalize'
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import AddOption from './addOption'
import Modal from "react-modal";
import {useDispatch, useSelector} from 'react-redux'
import { listOptions,removeOption, setSelected as selectOption} from 'modules/options/actions'
import {loadingSelector, errorSelector, optionsSelector, messageSelector, nowOptionSelector} from 'modules/options/selector'
export default function Options(props) {
  const dispatch = useDispatch()
  const options = useSelector(optionsSelector)
  const loading = useSelector(loadingSelector)
  const option_error = useSelector(errorSelector)
  const message  = useSelector(messageSelector)
  React.useEffect(() => {
	  if(isEmpty(message) && isEmpty(options)) {
	  dispatch(listOptions())
    }
    },[dispatch, options] )
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [list, setList] = React.useState([])
  const history = useHistory()
  const handleEdit = option => {
    delete option.actions
    dispatch(selectOption(option))
    history.push("/addOption")
  }
  const handleRemove = option => {
    const confirm = window.confirm(`You are about to remove Option. This is permanant`)
    if(!!confirm){
      dispatch(removeOption(option.id))
    }
  }
  const columns = [
    {
      Header: "Name",
      accessor: d => normalizeText(d.name),
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
  map(options, (option) =>
    assign(option, {
      actions: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "0 5px" }}>
            <button onClick={() => handleEdit(option)} className="transparentButton">
              <FaEdit />
            </button>
          </div>
          <div>
            <button onClick={() => handleRemove(option)} className="transparentButton">
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
              className="transparentButton"
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
	 {
		 !isEmpty(message) && 
		 <div className="UcenterWithMargin IamInfo">
		 	* Add Options to view in this table
		 </div>
	 }
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button
          onClick={() => setOpen(true)}
          className="fix-me-right cta-button transparent-button"
        >
          Add Option
        </button>
      </div>
    </div>
  );
}
