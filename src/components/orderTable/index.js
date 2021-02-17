import React from 'react'
import { useTable } from 'react-table'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import MaUTable from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import {FaStroopwafel} from 'react-icons/fa'
const Table = ({ columns, data }) => {
  const [records, setRecords] = React.useState(data)

  const getRowId = React.useCallback(row => {
    return row.name
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    data: records,
    columns,
    getRowId,
  })

  const moveRow = (dragIndex, hoverIndex) => {
    debugger
    const dragRecord = records[dragIndex]
    setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              <TableHead/>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(
            (row, index) =>
            {
            return   prepareRow(row) || (
                <Row
                  index={index}
                  row={row}
                  moveRow={moveRow}
                  {...row.getRowProps()}
                />
              )
            }
          )}
        </TableBody>
      </MaUTable>
    </DndProvider>
  )
}

const DND_ITEM_TYPE = 'row'

const Row = ({ row, index, moveRow }) => {
  debugger
  const dropRef = React.useRef(null)
  const dragRef = React.useRef(null)

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: DND_ITEM_TYPE, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  preview(drop(dropRef))
  drag(dragRef)

  return (
    <TableRow ref={dropRef} style={{ opacity }}>
      <TableCell ref={dragRef}><FaStroopwafel/></TableCell>
      {row.cells.map(cell => {
        return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
      })}
    </TableRow>
  )
}

const OrderTable = ({columns, data}) => {
  return (
      <Table columns={columns} data={data} />
  )
}

export default OrderTable