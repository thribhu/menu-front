import React from 'react';
import classname from 'classnames'
import styles from './Items.module.sass';
import {useHistory} from 'react-router-dom'
import items from './items.json'
import Table from 'components/table'
import {normalizeText as normalize} from 'utils/normalize'
import {FaEdit, FaTrash} from 'react-icons/fa'
import _ from 'lodash';
import Modal from 'react-modal';
import AddItem from './addItem'
export default function Items (){
    const [selected, setSelected] = React.useState()
    const [open, setOpen] = React.useState(false)
    const history = useHistory()
    const columns = [
        {
            Header: "Name",
            accessor: 'name'
        },
        {
            Header:'Type',
            accessor:'type'
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
        // {
        //     Header: normalize("option group"),
        //     accessor: "option_groups",
        //     Cell: row => {
        //         debugger
        //         return (
        //             _.map(row.value, (r, i) => (
        //                 <div key={i}>
        //                     {normalize(r.name)}
        //                 </div>
        //             ))
        //         )
        //     }
        // },
        // {
        //     Header: normalize("options"),
        //     accessor: "options",
        //     Cell: row => {
        //         return (
        //             _.map(row.value, r => (
        //                 <div>
        //                     {normalize(r.name)}
        //                 </div>
        //             ))
        //         )
        //     }
        // },
        {
            Header: "Actions",
            accessor: "actions"
        }
    ]
    _.map(items, item => _.assign(item, {actions: (
        <div style={{display: 'flex'}}>
            <div style={{padding: '0 5px'}}>
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
    )}))
    return (
        <div>
            <Modal
                isOpen={open}
                onRequestClose={() => setOpen(false)}
            >
                <AddItem/>
            </Modal>
            <Table columns={columns} data={items} updateSelectItems={setSelected}/>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
              <button onClick={() => setOpen(true)} className={classname(styles.ctaButton)}>
                Add Item
              </button>
            </div>
        </div>
    )
}