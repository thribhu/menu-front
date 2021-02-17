import React from 'react';
import classname from 'classnames'
import styles from './Groups.module.sass';
import Modal from 'react-modal'
import Table from 'components/table'
import OrderTable from 'components/orderTable'
import Groups from 'views/Groups/groups.json'
import AddGroup from 'views/Groups/addGroup'
import options from 'views/Options/options.json'
import _ from 'lodash'
import {useHistory} from 'react-router-dom'
import {FaTrash, FaEdit} from 'react-icons/fa'
const columns = [
    {
        Header: 'Image',
        accessor: 'image'
    },
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
]
export default function GroupsTable (){
  const [selected, setSelected] = React.useState([])
  const history = useHistory()
  const [form, setForm] = React.useState()
  const [open, setOpen] = React.useState(false)
  const [step1, setSetp1] = React.useState(false);
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  _.map(Groups, option => _.assign(option, {actions: (
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
        <div className={classname(styles.tableContainer)}>
    <Modal
      isOpen={open}
      onRequestClose={() => {setOpen(false);setSetp1(false)}}
      style={customStyles}
    >
      {step1 &&
      <div>
        <button onClick={() => setSetp1(false)}>
          Back
        </button>
      </div>
      }
      {!step1 ?
        <AddGroup next={setSetp1} formMethod={setForm} currentForm={form}/>
        :
        <div>
          <Table updateSelectItems={setSelected} columns={columns} data={options}/>
          <div className={classname(styles.buttonGroup)}>
            <div>
              <button className={classname(styles.ctaButton)}>
                New Option
              </button>
            </div>
            <div>
              <button className={classname(styles.ctaButton)} style={{width: '150px'}} onClick={() => history.push('/addGroup', {currentForm: form, selected})}>
                Add options to group
              </button>
            </div>
          </div>
        </div>
      }
    </Modal>
    <div className={classname(styles.tableFlex)}>
            <Table 
            updateSelectItems={setSelected}
            columns={[
                {
                  Header: "Group",
                  accessor: "name",
                  width: 50,
                },
                {
                    Header: 'Display Order',
                    accessor: 'display_order'
                },
                {
                  id: "price",
                  Header: "Price $",
                  accessor: 'price_default',
                },
                {
                  Header: "Max Allowed",
                  accessor: "max_allowed",
                },
                {
                  Header: "Min Required",
                  accessor: "min_required",
                },
                {
                    Header: "Actions",
                    accessor: "actions"
                }
              ]}
              data={Groups}
            />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
              <button onClick={() => setOpen(true)} className={classname(styles.ctaButton)}>
                Add Group
              </button>
            </div>
        </div>
    )
}