import React from "react";
import {
  useTable,
  useFilters,
  useAsyncDebounce,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter
} from "react-table";
import _ from 'lodash'
import classnames from "classnames";
import { matchSorter } from "match-sorter";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from './table.module.css'

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {map} from 'lodash'
const style = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const newStyles = {
  formControlMargins: {
    margin: "3px 0 !important",
  },
  gridContainer: {
    justifyContent: "center",
  },
};
// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
    <input
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
      className={classnames(styles.rt_header_search)}
    />
    </div>
  );
}
// global filter
function GlobalFilter({preGlobalFilteredRows, globalFilter, setGlobalFilter}){
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)
  return (
    <span>
      Search: {''}
      <input 
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records`}
        style={{
          fontSize: '1rem',
          border: '0',
          padding: '10px'
        }}
      />
    </span>
  )
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

// Our table component
function Table({ columns, data, updateSelectItems, withCheckBox, noAction }) {
  const [numberOfRows, setNumberOfRows] = React.useState(10);
  const [pageSelect, handlePageSelect] = React.useState(0);
  const memo_columns = React.useMemo(() => {
    if(noAction) {
      return _.map(columns, col => col.pop)
    }
    else return columns
  }, [noAction])
  const memo_data = React.useMemo(() => data)
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    visibleColumns,
    nextPage,
    pageOptions,
    pageCount,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
    gotoPage,
    state: {pageIndex, pageSize, selectedRowIds},
    selectedFlatRows,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns: memo_columns,
      data: memo_data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { pageSize: 10, pageIndex: 0 },
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      withCheckBox &&  hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  );

  let pageSelectData = Array.apply(
    null,
    Array(pageOptions.length)
  ).map(function () { });
  let numberOfRowsData = [5, 10, 20, 25, 50, 100];
  React.useEffect(() => {updateSelectItems(map(selectedFlatRows, d => d.original))}, [updateSelectItems,selectedRowIds])
  return (
      <div className={classnames(styles.ReactTable)}>
        <div className="pagination-top">
          <div className={classnames(styles._pagination)}>
            <div className="-previous">
              <button
                type="button"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="-btn"
              >
                Previous
              </button>
            </div>
            <div className={classnames(styles._center)}>
              <GridContainer style={{display:'flex', justifyContent: 'center'}}>
                <GridItem xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                  >
                    <Select
                      MenuProps={{
                      }}
                      classes={{
                      }}
                      value={pageSelect}
                      onChange={(event) => {
                        gotoPage(event.target.value);
                        handlePageSelect(event.target.value);
                      }}
                      inputProps={{
                        name: "pageSelect",
                        id: "page-select",
                      }}
                    >
                      {pageSelectData.map((prop, key) => {
                        return (
                          <MenuItem
                            key={key}
                            classes={{
                            }}
                            value={key}
                          >
                            Page {key + 1}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <FormControl
                    fullWidth
                  >
                    <Select
                      MenuProps={{
                      }}
                      classes={{
                      }}
                      value={numberOfRows}
                      onChange={(event) => {
                        setPageSize(event.target.value);
                        setNumberOfRows(event.target.value);
                      }}
                      inputProps={{
                        name: "numberOfRows",
                        id: "number-of-rows",
                      }}
                    >
                      {numberOfRowsData.map((prop) => {
                        return (
                          <MenuItem
                            key={prop}
                            classes={{
                            }}
                            value={prop}
                          >
                            {prop} rows
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
            </div>
            <div className="-next">
              <button
                type="button"
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <MaUTable {...getTableProps()} >
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} className="rt-tr">
                {headerGroup.headers.map((column, key) => (
                  <TableCell
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={classnames("rt-th rt-resizable-header", {
                      "-cursor-pointer": headerGroup.headers.length - 1 !== key,
                      "_sort-asc": column.isSorted && !column.isSortedDesc,
                      "_sort-desc": column.isSorted && column.isSortedDesc,
                    })}
                  >
                    <div className="rt-resizable-header-content" style={{textAlign: 'center'}}>
                      {column.render("Header")}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
            <TableRow >
                  <TableCell colSpan={visibleColumns.length} style={{textAlign: 'left'}}>
                    <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/>
                  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            // style={{ textAlign: "center" }}
            {...getTableBodyProps()}
            className="rt-tbody"
          >
            {page.map((row, i) => {
              prepareRow(row);

              return (
                <TableRow
                  {...row.getRowProps()}
                  className={classnames(
                    "rt-tr",
                    { " -odd": i % 2 === 0 },
                    { " -even": i % 2 === 1 }
                  )}
                //   onClick={() => handleClickOpen(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()} className="rt-td" style={{textAlign: 'center'}} >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </div>
  );
}
export default Table;
