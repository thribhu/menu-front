import React from 'react';
import classname from 'classnames'
import styles from './Items.module.sass';
import { useHistory } from 'react-router-dom'
import items from './items.json'
import Table from 'components/table'
import { normalizeText as normalize } from 'utils/normalize'
import { FaEdit, FaTrash, FaWindowClose } from 'react-icons/fa'
import _ from 'lodash';
import Modal from 'react-modal';
import AddItem from './addItem'
const customStyles = {
    content : {
        margin: 'auto',
        height: '80%',
        width: '100%',
        maxWidth: '600px',
        overflow: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)'
    }
  };
export default function Items() {
    const [selected, setSelected] = React.useState()
    const [open, setOpen] = React.useState(false)
    const [newItem, setItem] = React.useState()
    const history = useHistory()
    React.useEffect(() => {
        _.merge(items, newItem)
    }, [newItem])
    const columns = [
        {
            Header: "Name",
            accessor: 'name'
        },
        {
            Header: 'Type',
            accessor: 'type'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            Header: 'Active',
            accessor: d => d.active === 1 ? "True" : "False"
        },
        {
            Header: "Stock",
            accessor: 'stock'
        },
        {
            Header: "Actions",
            accessor: "actions"
        }
    ]
    _.map(items, item => _.assign(item, {
        actions: (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: '0 5px' }} >
                    <button className={classname(styles.transparent)}>
                        <FaEdit />
                    </button>
                </div>
                <div>
                    <button className={classname(styles.transparent)}>
                        <FaTrash />
                    </button>
                </div>
            </div>
        )
    }))
    return (
        <div className={classname(styles.tableContainer)}>
            <Modal
                isOpen={open}
                style={customStyles}
            >
                <div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => setOpen(false)} style={{ cursor: 'pointer' }} className={classname(styles.transparent)}>
                            <FaWindowClose />
                        </button>
                    </div>
                    <AddItem setOpen={setOpen} setItem={setItem}/>
                </div>
            </Modal>
            <div>
                <Table columns={columns} data={items} updateSelectItems={setSelected} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
                <button onClick={() => setOpen(true)} className={classname(styles.ctaButton)}>
                    Add Item
              </button>
            </div>
        </div>
    )
}