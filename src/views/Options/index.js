import React from 'react'
import _ from 'lodash'
import classname from 'classnames';
import styles from './Options.module.sass'
import {useHistory} from 'react-router-dom'
import Table from 'components/table'
import options from './options.json'
import {FaEdit, FaTrash} from 'react-icons/fa'
export default function Options (){
    const [selected, setSelected] = React.useState()
    const [open, setOpen] = React.useState(false)
    const columns =[
        // {
        //     Header: 'Image',
        //     accessor: 'image'
        // },
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            Header: 'Type',
            accessor: 'type'
        },
        {
            Header: 'Modifiers',
            accessor: d => d.modifiers.join(', ')
        },
        {
            Header: 'Actions',
            accessor: 'actions'
        }

    ]
    _.map(options, option => _.assign(option, {actions: (
            <div style={{display: 'flex', justifyContent:'center'}}>
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
            <Table columns={columns} data={options} updateSelectItems={setSelected}/>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
              <button onClick={() => setOpen(true)} className={classname(styles.ctaButton)}>
                Add Option
              </button>
            </div>
        </div>
    )
}