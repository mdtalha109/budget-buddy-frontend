
import { useTable, usePagination, useSortBy, Column, TableInstance, TableState, Row, ColumnInstance } from 'react-table';
import Table from '../Table';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface DataTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number,
  isSortable?: boolean;
  isPaginated?: boolean;
  hiddenColumns?: string[];
}

interface TableStateWithPagination<T extends object> extends TableState<T> {
  pageIndex: number;
  pageSize: number;
}

interface TableInstanceWithPagination<T extends object> extends TableInstance<T> {
  page: Row<T>[];
  canNextPage: boolean;
  canPreviousPage: boolean;
  nextPage: () => void;
  previousPage: () => void;
  pageOptions: number[];
  setPageSize: (size: number) => void;
  state: TableStateWithPagination<T>;
}

interface ColumnInstanceWithSort<T extends object> extends ColumnInstance<T> {
  isSorted?: boolean;
  isSortedDesc?: boolean;
  getSortByToggleProps: (propGetter?: any) => any;
}

const DataTable = <T extends object>({ columns, data, hiddenColumns= [], pageSize=10, isSortable=true, isPaginated=true }: DataTableProps<T>) => {


  const tableHooks = [];
  if (isSortable) {
    tableHooks.push(useSortBy);
  }
  if (isPaginated) {
    tableHooks.push(usePagination);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex },
    prepareRow,
  } = useTable<T>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize, hiddenColumns } as Partial<TableStateWithPagination<T>>,
    },
    useSortBy,
    ...tableHooks
  ) as TableInstanceWithPagination<T>;

  return (
    <div className="">
      <div className="overflow-x-auto">
        <Table {...getTableProps()}>
          <Table.Header >
            {headerGroups.map(headerGroup => (
              <Table.Row {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => {
                  const col = column as unknown as ColumnInstanceWithSort<T>;
                  return (
                    <Table.Head
                      {...col.getSortByToggleProps()}
                      className={`cursor-pointer ${col.isSorted ? (col.isSortedDesc ? 'desc' : 'asc') : ''}`}
                    >
                      <div className='flex items-center gap-2'>
                         {col.render('Header')}
                      <span>
                        {col.isSorted
                          ? col.isSortedDesc
                            ? <FaArrowDown/>
                            : <FaArrowUp/>
                          : ''}
                      </span>
                      </div>
                     
                    </Table.Head>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
          
          <Table.Body {...getTableBodyProps()}>
            {page.map(row => {
              prepareRow(row);
              return (
                <Table.Row {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Table.Cell
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      {
       (canPreviousPage || canNextPage) && <div className="pagination flex justify-between items-center mt-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className={`px-2 sm:px-4 py-2 border rounded-lg transition-colors ${!canPreviousPage ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          showing page
         
            {pageIndex + 1} of {pageOptions.length}
         
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className={`px-2 sm:px-4 py-2 border rounded-lg transition-colors ${!canNextPage ? 'bg-gray-200 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
      }
      
    </div>
  );
};

export default DataTable;
