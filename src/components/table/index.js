import React from "react";
import {
  useTable,
  useFilters,
  useAsyncDebounce,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from "react-table";
import _ from "lodash";
import classnames from "classnames";
import { matchSorter } from "match-sorter";
import styles from "./table.module.css";

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { map } from "lodash";
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
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
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
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);
  return (
    <div className="flex" style={{width:'100%'}}>
      <div style={{ display: "flex", alignItems: "center" }}>Search</div>
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        style={{
          margin: "10px",
          width: "100%",
          fontSize: "1rem",
          border: "solid 1px",
          borderRadius: "5px",
          padding: "10px",
        }}
      />
    </div>
  );
}
function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);

// Our table component
function Table({
  columns,
  data,
  updateSelectItems,
  withCheckBox,
  noAction,
  preSelected,
  title,
  callback,
  cb_name,
}) {
  const memo_columns = React.useMemo(() => {
    if (noAction) {
      _.remove(columns, { Header: "Actions" });
      return columns;
    } else return columns;
  }, [noAction]);
  const memo_data = React.useMemo(() => data, [data]);
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
  const preSelectIndex = _.map(preSelected, (s) =>
    _.indexOf(
      memo_data.map((m) => m.id),
      s.id
    )
  );
  const selected = {};
  preSelectIndex.map((i) => (selected[i] = true));
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    state: { selectedRowIds },
    selectedFlatRows,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns: memo_columns,
      data: memo_data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: { selectedRowIds: selected },
      autoResetSelectedRows: false,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      if (withCheckBox) {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      } else return null;
    }
  );

  React.useEffect(() => {
    updateSelectItems(
      map(selectedFlatRows, (d) => {
        return d.original;
      })
    );
  }, [updateSelectItems, selectedRowIds, selectedFlatRows]);
  return (
    <div className={classnames(styles.ReactTable)}>
      {title && <div className={classnames(styles.tableTile)}>{title}</div>}
      <div className="flex">
        <div id="search-bar">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        {!_.isUndefined(callback) && 
        <div>
          <button
            className="cta-button transparent-button"
            onClick={() => callback()}
          >
            {cb_name}
          </button>
        </div>
        }
      </div>
      {}
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} className="rt-tr">
              {headerGroup.headers.map((column, key) => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div
                    className="rt-resizable-header-content table-header"
                    style={{ textAlign: "center" }}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()} className="rt-tbody">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell
                      {...cell.getCellProps()}
                      className="rt-td"
                      style={{ textAlign: "center" }}
                    >
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
