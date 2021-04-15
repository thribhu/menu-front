import React from "react";
import classname from "classnames";
import styles from "./Items.module.sass";
import { useHistory } from "react-router-dom";
import items from "./items.json";
import Table from "components/table";
import { normalizeText } from "utils/normalize";
import { FaEdit, FaTrash, FaWindowClose } from "react-icons/fa";
import _, { isEmpty } from "lodash";
import Modal from "react-modal";
import AddItem from "./addItem";
import { useDispatch, useSelector } from "react-redux";
import {
  listItems,
  removeItem,
  setSelected as selectItem,
} from "modules/items/actions";
import {
  listSelector,
  loadingSelector,
  errorSelector,
  itemInfoSelector,
} from "modules/items/selector";
import { listGroup } from "modules/groups/actions";
import { listSelector as groupsSelector } from "modules/groups/selector";
import { listOptions } from "modules/options/actions";
import { optionsSelector } from "modules/options/selector";
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
export default function Items() {
  const dispatch = useDispatch();
  const items = useSelector(listSelector);
  const groups = useSelector(groupsSelector);
  const options = useSelector(optionsSelector);
  const loading = useSelector(loadingSelector);
  const error = useSelector(errorSelector);
  const itemInfo = useSelector(itemInfoSelector);
  const [selected, setSelected] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [newItem, setItem] = React.useState();
  const history = useHistory();
  React.useEffect(() => {
    if (isEmpty(itemInfo) && isEmpty(items)) {
      dispatch(listItems());
    }
  }, [dispatch, items]);
  /*
    if(isEmpty(items)) {
        dispatch(listItems())
    }
    */
  const handleEdit = (item) => {
    delete item.actions;
    dispatch(selectItem(item));
    history.push("/addItem");
  };
  const handleDelete = (item) => {
    const confirm = window.confirm(
      "You are about to remove an item. This is permanant"
    );
    if (!!confirm) {
      dispatch(removeItem(item.id));
    }
  };
  const columns = [
    {
      Header: "Name",
      accessor: (d) => normalizeText(d.name),
    },
    {
      Header: "Type",
      accessor: (d) => normalizeText(d.type) || "-",
    },
    {
      Header: "Price",
      accessor: (d) => d.price || "-",
    },
    {
      Header: "Active",
      accessor: (d) => (d.active === 1 ? "True" : "False"),
    },
    {
      Header: "Stock",
      accessor: (d) => d.stock || "-",
    },
    {
      Header: "Options",
      accessor: (d) => {
        let names = _.map(d.options, (_) => normalizeText(_.name));
        return names.join(", ") || "-";
      },
    },
    {
      Header: "Groups",
      accessor: (d) => {
        let names = _.map(d.option_groups, (_) => normalizeText(_.name));
        return names.join(", ") || "-";
      },
    },
    {
      Header: "Actions",
      accessor: "actions",
    },
  ];
  _.map(items, (item) =>
    _.assign(item, {
      actions: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ padding: "0 5px" }}>
            <button
              className="transparentButton"
              onClick={() => handleEdit(item)}
            >
              <FaEdit />
            </button>
          </div>
          <div>
            <button
              className="transparentButton"
              onClick={() => handleDelete(item)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ),
    })
  );
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
          <AddItem setOpen={setOpen} setItem={setItem} />
        </div>
      </Modal>
      <div>
        <Table columns={columns} data={items} updateSelectItems={setSelected} />
        {!isEmpty(itemInfo) && (
          <div className="UcenterWithMargin IamInfo">
            * Add Items to view in this table
          </div>
        )}
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <button
          onClick={() => setOpen(true)}
          className={classname(styles.ctaButton)}
        >
          Add Item
        </button>
      </div>
    </div>
  );
}
